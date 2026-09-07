---
id: lidi-202609-import-03-frameworks-vue-reactive-boundary-q03
title: markRaw 会带来什么影响？
aliases: []
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [Proxy, track, trigger, computed, 响应式]
---

# markRaw 会带来什么影响？

## 核心回答

它告诉 Vue 不要把某个对象转成响应式，适合地图、图表实例等外部对象。标记后内部变化不会自动驱动模板，清理和手动刷新都要自己负责。

