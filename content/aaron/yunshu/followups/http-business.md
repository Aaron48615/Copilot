---
id: yunshu-followup-http-business
title: 追问：HTTP 200 是否就代表业务成功？
aliases: [能讲讲项目中的HTTP 200 与业务成功的区别吗？, 关于HTTP 200 与业务成功的区别，能结合当前项目解释一下吗？]
category: yunshu
difficulty: 基础
priority: normal
projects: [云枢智慧城市数据平台]
keywords: [追问, HTTP 200, 业务码, 数据结构]
---

# 追问：HTTP 200 是否就代表业务成功？

## 核心回答

不一定。HTTP 200 只表示请求成功返回，业务还要看 code 和数据结构。拦截器统一处理业务 401、5xx，页面也会判断 `code === 200`，但统一层没有覆盖所有失败业务码。

【Blob 文件不能直接按普通 JSON 业务码判断，还要检查响应头或内容。】

## 回答要点

- 不一定。HTTP 200 只表示请求成功返回，业务还要看 code 和数据结构。
- Blob 文件不能直接按普通 JSON 业务码判断，还要检查响应头或内容。

## 面试官可能追问

- 业务码成功但关键字段缺失时是否应更新页面？
- Blob 响应与普通 JSON 的失败检查有什么不同？

## 代码证据

> **代码依据（不用于口述）**
>
> - [request.ts，第 73～92 行](/Users/aaron/personal-hub/apps/project-1/src/utils/request.ts:73)：HTTP 成功回调中继续处理业务 401 和业务 5xx。
> - [ChartEditor.tsx，第 258～264 行](/Users/aaron/personal-hub/apps/project-1/src/pages/ChartEditor.tsx:258)：页面检查业务码和空数据后才生成图表。
> - [cities.ts，第 59～77 行](/Users/aaron/personal-hub/apps/project-1/src/api/cities.ts:59)：导出接口按 Blob 响应处理。
