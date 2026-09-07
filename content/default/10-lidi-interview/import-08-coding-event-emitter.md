---
id: lidi-202609-import-08-coding-event-emitter
title: 手写 EventEmitter 时要处理哪些边界？
aliases: [手写发布订阅, EventEmitter]
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [EventEmitter, 发布订阅, once, unsubscribe]
---

# 手写 EventEmitter 时要处理哪些边界？

## 核心回答

我会用 `Map<event, Set<listener>>` 保存监听器，`on` 添加，`off` 删除，`emit` 复制当前集合后逐个调用，避免回调里取消订阅影响本轮遍历。`once` 可以包一层函数，执行后自动移除。还要明确监听器抛错是继续通知其他监听器，还是交给统一 error 事件处理，不能让这个选择隐含在实现里。

