---
id: lidi-202609-import-08-coding-throttle-q02
title: 怎么测时间边界？
aliases: []
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [throttle, 节流, leading, trailing]
---

# 怎么测时间边界？

## 核心回答

1. 先固定被测实现的约定，再写具体时间线，包括首调用、尾调用、cancel 和 flush 的含义。不同节流实现对空闲后的新周期可能处理不同，不能用某个库的名字替代预期结果，也不能只检查总共执行了几次。

2. 用 fake timer 同时控制实现实际依赖的计时 API，再按小步推进时间。下面假设两端开启、首调用立即执行，等待期间保留最新参数。在到期前一毫秒和到期时分别断言，能暴露提前触发或遗漏尾调用。

    ```js
    vi.useFakeTimers();
    try {
      const fn = vi.fn();
      const t = throttle(fn, 100);
      t('A');
      vi.advanceTimersByTime(30); t('B');
      vi.advanceTimersByTime(69);
      expect(fn).toHaveBeenCalledTimes(1);
      vi.advanceTimersByTime(1);
      expect(fn).toHaveBeenCalledTimes(2);
      expect(fn).toHaveBeenLastCalledWith('B');
      t.cancel();
    } finally { vi.useRealTimers(); }
    ```

3. 接着覆盖配置组合：只开 leading 不应留下尾调用，只开 trailing 应延迟首次执行，两端都开且只有一次输入不能重复执行。若实现允许两端都关，也要明确完全不执行，或者选择在入口拒绝这种配置。

4. cancel 和 flush 都要在有、无待执行任务时验证，再推进时间确认不会重复补执行。还要记录 this 和参数，防止尾调用使用首次数据。若函数承诺返回上次结果，也应分别检查立即调用和延迟调用时的返回行为。

5. 最后测时间源和环境边界：采用 Date.now 的实现需要考虑系统时间回拨，采用单调时钟则要确认测试也控制了它。真实浏览器会延后执行定时器，所以测试证明的是时间规则，不能据此承诺线上在某个毫秒精确回调。

## 追问：恰好到期时又收到调用，应该先执行哪个？

1. JavaScript 回调最终按事件循环实际执行顺序运行，时间戳相同不等于同时执行。若到期回调先处理，它可能用旧的待执行参数；若输入回调先处理，则可能先覆盖参数，具体取决于实现规则。

2. 因此测试要把顺序写出来，别只设置两个任务都在一百毫秒后发生。分别构造「先推进到期，再调用」和「到期任务尚未运行时收到输入」的路径，观察是否重复执行、丢尾调用或留下多余定时器。

3. 预期结果要与选定约定一致，例如冷却型实现会在尾调用后重新开始等待，边界后的输入进入下一轮。对复杂的时间戳实现，可以注入时钟和调度函数来控制顺序，避免测试碰巧依赖运行环境的同刻任务安排。

## 追问：为什么设置系统时间不能代替推进定时器？

1. 改系统时间模拟的是墙上时钟跳变，不代表事件循环已经执行了到期任务。在 Vitest 里，`vi.setSystemTime` 不会触发定时器，所以只把时间改到未来，再断言尾调用发生，测试假设本身就不成立。

2. 常规边界用 `advanceTimersByTime` 推进调度时间，系统时间跳变则单独建立用例。如果实现混用 Date.now 和 performance.now，还要确认两者在测试里的控制方式一致，否则可能出现只在假时钟下发生的异常。

3. 定时回调中还可能创建 Promise，推进定时器之后异步结果未必已完成，这时应按测试工具约定使用异步推进并等待结果。每个用例结束恢复真实计时器，避免后续测试继承残留的虚拟时间或待执行任务。
