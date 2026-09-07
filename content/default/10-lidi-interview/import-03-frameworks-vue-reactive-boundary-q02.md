---
id: lidi-202609-import-03-frameworks-vue-reactive-boundary-q02
title: shallowRef 什么时候有用？
aliases: []
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [Proxy, track, trigger, computed, 响应式]
---

# shallowRef 什么时候有用？

## 核心回答

第三方实例、大型不可变对象不需要深层代理时，可以用 shallowRef，只追踪 ref.value 的替换。内部对象自己变化不会触发更新，使用时要明确由谁负责通知。

