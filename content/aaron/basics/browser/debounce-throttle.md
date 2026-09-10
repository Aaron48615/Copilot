---
id: aaron-basic-browser-debounce-throttle
title: 防抖和节流有什么区别，适合哪些场景
aliases: [请讲讲：防抖和节流有什么区别，适合哪些场景, 关于“防抖和节流有什么区别，适合哪些场景”，你会怎样回答？]
category: browser
difficulty: 基础
priority: normal
projects: []
keywords: [防抖, 节流, 定时器]
---

# 防抖和节流有什么区别，适合哪些场景

## 核心回答

防抖是连续触发时重新计时，等用户停下来一段时间再执行，比如搜索框输入停止后再请求联想。节流是持续触发时限制执行频率，比如滚动过程中隔一段时间更新一次位置。

所以防抖更关注“等这轮操作暂时结束”，节流更关注“操作过程中也要定期处理”。两者都需要决定第一次是否立即执行、最后一次是否补执行，不能只背一个定时器写法就认为行为完全一样。

```js
// 停止触发 wait 毫秒后，执行最后一次调用
function debounce(fn, wait) {
  let timer;
  function wrapped(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), wait);
  }
  wrapped.cancel = () => clearTimeout(timer);
  return wrapped;
}

// 首次立即执行，时间窗口内忽略后续调用，不补尾次
function throttle(fn, wait) {
  let last = -Infinity;
  return function (...args) {
    const now = performance.now();
    if (now - last >= wait) {
      last = now;
      return fn.apply(this, args);
    }
  };
}
```

【组件销毁时要清理防抖定时器。防抖只能减少请求发起次数，已经发出的旧请求仍可能后返回，所以搜索联想还需要取消请求或校验请求序号。提交订单这类操作也不能只靠节流防重复，服务端仍要保证幂等。】
