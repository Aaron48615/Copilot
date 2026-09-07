---
id: lidi-202609-import-02-javascript-api-state-union-q01
title: 为什么不写 loading、error、data 三个字段？
aliases: []
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [TypeScript, loading, error, success, 联合类型]
---

# 为什么不写 loading、error、data 三个字段？

## 核心回答

三个独立字段允许出现互相冲突的组合，比如 error 不为空但 data 也被当成最新成功结果。联合类型把合法状态写进类型，更新时必须整体替换。若确实需要保留旧 data，再给 stale 或 previousData 设计明确字段，不要靠隐含约定。
