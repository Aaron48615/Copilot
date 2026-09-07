---
id: lidi-202609-import-03-frameworks-react-server-state-q02
title: 请求失败后缓存怎么处理？
aliases: []
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [server state, cache, React, 请求, UI state]
---

# 请求失败后缓存怎么处理？

## 核心回答

可以保留上一份数据并标记过期，让用户知道当前内容可能不是最新；新请求成功后再替换。创建、删除这类写操作要按接口结果更新或失效相关缓存，失败时回滚乐观更新。重试需要识别临时错误，不能把权限拒绝和参数错误反复发送。

