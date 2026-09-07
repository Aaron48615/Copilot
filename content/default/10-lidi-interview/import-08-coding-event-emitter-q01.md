---
id: lidi-202609-import-08-coding-event-emitter-q01
title: 为什么 emit 时要复制集合？
aliases: []
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [EventEmitter, 发布订阅, once, unsubscribe]
---

# 为什么 emit 时要复制集合？

## 核心回答

如果直接遍历原 Set，某个监听器在执行中删除自己或新增监听器，当前轮次的行为会变得难预测。先复制可以固定本轮快照，新增监听器下次才生效，删除也不会跳过其他已经排队的监听器。复制带来一点成本，但事件数量通常值得这个可预测性。

