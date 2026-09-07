---
id: lidi-202609-import-08-coding-event-emitter-q02
title: 怎么避免内存泄漏？
aliases: []
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [EventEmitter, 发布订阅, once, unsubscribe]
---

# 怎么避免内存泄漏？

## 核心回答

组件卸载或订阅者不再需要时必须调用返回的取消函数，空集合及时从 Map 删除。全局 emitter 不应长期保存短生命周期对象的闭包；如果确实需要弱引用，要先确认运行环境和语义是否值得复杂化。测试里可以检查 off 后不再收到事件。

