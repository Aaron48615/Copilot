---
id: lidi-202609-javascript-coding-q01
title: 手写一个防抖函数。
aliases: []
category: current-interview
difficulty: 高频
priority: high
projects: []
keywords: [debounce, Set, flat, 现场手写, JavaScript]
---

# 手写一个防抖函数。

## 核心回答

```js
function debounce(fn, delay) {
  let timer = null;

  return function (...args) {
    if (timer) clearTimeout(timer);

    timer = setTimeout(() => {
      fn.apply(this, args);
      timer = null;
    }, delay);
  };
}
```

1. `timer` 放在外层函数里，是为了让返回的函数多次调用时共享同一个定时器。
2. 每次调用先清掉旧定时器，再创建新定时器，所以只有最后一次调用会在停止输入后执行。
3. `...args` 保留参数，`fn.apply(this, args)` 保留调用时的上下文和参数。
4. 如果项目需要组件销毁时取消，可以给返回函数增加 `cancel` 方法，在里面清掉定时器。

