---
id: lidi-202609-import-08-coding-throttle
title: 手写 throttle 时 leading、trailing 和取消怎么定义？
aliases: [手写节流, throttle 实现]
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [throttle, 节流, leading, trailing]
---

# 手写 throttle 时 leading、trailing 和取消怎么定义？

## 核心回答

1. 我会先约定节流的时间语义，再写代码：leading 决定一轮开始时是否立即执行，trailing 决定等待期间的新调用是否补一次。两者都开启时，单独调用一次不应在末尾重复执行；下面采用执行后进入冷却期的教学规则。

2. 等待期间只保留最近一次的参数和 this，不为每个事件各建一个定时器。比如等待时间是一百毫秒，零时刻执行 A，二十和六十毫秒收到 B、C，末尾应使用 C；具体毫秒数只是演示，不是业务推荐值。

3. 我会先写下面这个短版，约定 wait 为有限正数、忽略返回值，并且不允许 fn 同步重入包装函数。尾调用后再进入一个冷却期，所以空闲判定与 Lodash 不保证完全一致，不能作为库的等价替换。

    ```js
    function throttle(fn, wait, { leading = true, trailing = true } = {}) {
      let timer = null, args, ctx;
      function invoke() {
        const a = args, c = ctx;
        args = ctx = undefined;
        fn.apply(c, a);
      }
      function arm() { timer = setTimeout(expire, wait); }
      function expire() {
        timer = null;
        if (trailing && args) { arm(); invoke(); }
        else { args = ctx = undefined; }
      }
      function wrapped(...a) {
        if (!leading && !trailing) return;
        if (timer === null) {
          args = a; ctx = this;
          arm();
          if (leading) invoke();
        } else if (trailing) { args = a; ctx = this; }
      }
      wrapped.cancel = () => {
        clearTimeout(timer); timer = null;
        args = ctx = undefined;
      };
      wrapped.flush = () => {
        if (timer !== null && args && trailing) {
          clearTimeout(timer); arm(); invoke();
        }
      };
      return wrapped;
    }
    ```

4. cancel 会取消等待任务、清空参数和接收者，并重置冷却状态，下次调用按新一轮处理。flush 只提前执行确实待执行的尾调用，随后重新计时；没有待执行调用时应无事发生，不能重放最后一次已经执行的参数。

5. 节流限制的是函数开始执行的频率，不保证异步请求只存在一个，也不是服务端限流。若要用于公共工具，我会补上参数校验、返回值、重入和异常的约定，并围绕选定规则验证时间边界，避免只凭函数名判断兼容性。

## 追问：leading 和 trailing 都开启，为什么单次调用不补尾调用？

1. 首次调用已经即时执行了，尾调用的意义是处理等待期间出现的新输入。如果只调用一次也补一次，同一个点击就会触发两遍动作，调用者通常不会把这种行为理解为减少执行次数。

2. 实现上我会区分定时器存在与待执行参数存在：前者表示仍在冷却，后者表示又收到了尚未处理的调用。首次执行后清空参数，后续调用再写入，定时器到期时才能判断是否真的需要补执行。

3. 对滚动位置这种可覆盖状态，保留最后参数很合适；对于每条事件都有意义的操作日志，丢弃中间参数就可能漏记录。此时应先缓存每条记录，再节流批量发送，而不能直接节流“记录一次事件”的函数。

## 追问：取消节流能否同时取消已经发出的请求？

1. cancel 只能阻止包装函数尚未开始的延迟调用。假设首调用已经执行了 fetch，再清理节流定时器不会撤回请求，因为网络任务由另一套资源和生命周期管理，不能从定时器状态推断它已停止。

2. 如果需要取消在途请求，我会另外保存 AbortController，在业务取消时发出 abort。对于已经返回或仍可能完成的旧请求，还要用请求版本校验响应，避免用户切换条件后，旧结果覆盖当前页面。

3. 服务端可能已经处理了请求，浏览器停止等待不等于服务端工作被撤销。涉及保存或提交时，我会依据接口约定使用幂等键或取消接口；组件卸载则同时清理监听、尾调用和页面响应更新，分别处理这些资源。
