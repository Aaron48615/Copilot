---
id: lidi-202609-import-08-coding-debounce
title: 手写一个支持取消和 flush 的 debounce
aliases: [手写防抖, debounce 实现]
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [debounce, 防抖, cancel, flush]
---

# 手写一个支持取消和 flush 的 debounce

## 核心回答

1. 先写只有尾部执行的教学版：最后一次调用后等 wait，再执行原函数，连续输入会重新计时。`cancel` 丢掉等待中的调用，`flush` 立刻执行等待中的调用。这里不默认加首次立即执行或最大等待时间。

2. 闭包保存定时器、最后一次参数和上下文，包装函数必须是普通函数，才能接到调用者的 `this`。执行时先清状态再调原函数，是为了让原函数内部再次调用包装器时，新一轮定时器不会被旧调用误清理。

    ```js
    function debounce(fn, wait = 0) {
      let timer = null, args, ctx, result;
      function invoke() {
        const a = args, c = ctx;
        timer = null;
        args = ctx = undefined;
        result = fn.apply(c, a);
        return result;
      }
      function wrapped(...a) {
        if (timer !== null) clearTimeout(timer);
        args = a;
        ctx = this;
        timer = setTimeout(invoke, wait);
        return result;
      }
      wrapped.cancel = () => {
        if (timer !== null) clearTimeout(timer);
        timer = null;
        args = ctx = undefined;
      };
      wrapped.flush = () => {
        if (timer === null) return result;
        clearTimeout(timer);
        return invoke();
      };
      return wrapped;
    }
    ```

3. `flush` 先清掉定时器再调用，防止立刻执行后又被原定时器执行一次；没有待执行调用时返回上次结果。普通调用也只返回上次执行结果，第一次通常是 `undefined`，别把这个包装器当成每次调用都返回新 Promise 的异步队列。

4. 连续调用只使用最后一次参数、取消后不执行、提前 flush 后不重复执行，以及方法调用能保留上下文，这些都要过一遍。这里约定传入合法函数和合理的非负等待时间。真实时间可能因事件循环繁忙而延后，wait 不代表精确执行时刻。

5. 这段没有覆盖 Lodash 的 leading、trailing 组合和 maxWait，也没有吞掉原函数异常。组件卸掉时应调用 cancel；原函数已经发出请求，还要单独处理请求取消，清定时器不能让已经执行的任务倒退。

## 追问：连续输入一直不停，尾部防抖会不会永远不执行？

1. 会。只要两次调用之间的间隔始终小于 wait，尾部计时就会一直重置。对搜索框通常可以接受，因为用户停下来才需要搜索；自动保存则可能不合适，持续输入时不该长期没有任何保存机会。

2. 继续完善时加入 maxWait，记下这一轮开始等待的时间，超过上限即使还在输入也触发一次。它需要和尾部定时一起管，执行后再确定下一轮边界，不能只不断重置一个普通定时器。

3. leading 解决的是第一次调用是否立刻执行，和最大等待时间不是同一个开关。若同时支持 leading 和 trailing，还要约定单次调用是否需要尾部再执行。按选定库的语义写用例，避免一次点击触发两次保存。

## 追问：flush 执行的是当前调用参数，还是最后一次等待参数？

1. 它执行最后一次等待中的参数和上下文，调用 `flush()` 本身不创建新业务调用。比如先调两次搜索，参数依次是「手」和「手机」，随后 flush，应立刻搜索「手机」，而不是用一个空参数去调搜索函数。

2. flush 会清掉原定时器并返回这次原函数的结果；原函数返回 Promise，返回的也只是那个 Promise，不代表异步操作已经完成。没有等待任务时再次 flush 不应重复调用原函数，可以返回缓存的上次结果。

3. 用调用次数和收到的参数一起验证，别只看返回值。再验证先 cancel 再 flush 不执行、flush 后原等待时间过去不重复执行，以及原函数同步抛错后待执行状态已经清掉，下一次才能正常调度。
