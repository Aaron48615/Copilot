---
id: lidi-202609-import-08-coding-promise-all
title: 如何简化实现 Promise.all？
aliases: [手写 Promise.all, Promise.all 实现]
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [Promise.all, 并发, thenable]
---

# 如何简化实现 Promise.all？

## 核心回答

1. 我会实现固定使用原生 Promise 的教学版，输入是有限的同步可迭代对象，包括数组和 Set。它把普通值、Promise 和 thenable 统一交给 Promise.resolve，全部成功时按输入顺序返回结果，任意一项拒绝时让组合结果拒绝。

2. 每枚举一项就捕获它的下标，成功后写回对应位置，不能按完成时间 push。计数初始为 1，作为“迭代尚未结束”的占位，枚举结束再减掉，空输入也能直接得到空数组；执行器内的同步异常由 Promise 构造函数转为拒绝。

    ```js
    function all(iterable) {
      return new Promise((resolve, reject) => {
        const values = [];
        let index = 0, remaining = 1;
        for (const item of iterable) {
          const i = index++;
          remaining++;
          Promise.resolve(item).then(value => {
            values[i] = value;
            if (--remaining === 0) resolve(values);
          }, reject);
        }
        if (--remaining === 0) resolve(values);
      });
    }
    ```

3. 空输入得到已 fulfilled 的 Promise，但通过 then 注册的回调仍异步执行；普通值也不会让 then 回调在当前调用栈直接运行。非法的非可迭代输入会导致返回值拒绝，异步迭代器不是这个同步 for...of 实现的支持范围。

4. Promise.resolve 负责采纳 thenable 的最终结果，包括其 then 访问或执行出错、重复调用结算函数等情况。组合器不需要自己再手写这套采纳逻辑；拒绝之后其他输入仍可能继续运行，后来的结果不会改变已经确定的组合状态。

5. 我会检查乱序完成仍按输入排序、空集合、普通值混入、thenable、输入拒绝和迭代器抛错。此版没有实现标准方法通过 this 支持自定义 Promise 构造器等完整约定，也假定内建方法未被改写，因此称为简化实现，实际业务优先使用原生方法。

## 追问：为什么不能先用 Array.from，再完全按数组处理？

1. 对普通有限数组来说可以这样简化，但不能说与原生方法的所有输入行为一致。Array.from 还接受仅有 length 的类数组，而 Promise.all 要求同步可迭代输入；直接转换可能让本应拒绝的参数被当成合法数据接受。

2. 先完整转换还会把“枚举所有输入”和“注册每一项的结果处理”分成两个阶段。若生成器先产出某个拒绝 Promise，随后迭代抛错，转换会中途失败，前面产出的 Promise 可能没有得到处理；逐项枚举时就注册处理更贴近原生流程。

3. 所以我会直接用 for...of，并在返回的 Promise 执行器内完成枚举，让同步异常转成拒绝。即便如此也不声称完整复刻规范，构造器泛型和异常迭代关闭等细节仍需专门对照；教学实现应把支持范围讲明白。

## 追问：thenable 连续调用 resolve 两次，会让计数减错吗？

1. 如果直接调用任意对象的 then 并在回调里减计数，确实可能被重复调用打乱。thenable 只是具有可调用 then 的对象，不一定遵守我们期望的约定，所以组合器不应该直接信任它只调用一次成功或失败回调。

2. 这里先使用原生 Promise.resolve 采纳它，原生结算逻辑会忽略后续重复结算，再在得到的 Promise 上注册回调。这样同一项的成功处理最多执行一次，既不会重复减少计数，也不会先成功后又把组合结果改成失败。

3. 我会构造 thenable，依次调用 resolve(1)、resolve(2)、reject(error)，确认该项最终值是 1，并混入另一个较晚完成的任务检查不会提前结束。若对象读取 then 时就抛错，也应该表现为拒绝，这部分由原生采纳逻辑处理。
