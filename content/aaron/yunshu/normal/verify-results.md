---
id: yunshu-normal-verify-results
title: 接口业务结果、文件导出和异常状态
aliases: [能讲讲项目中的接口业务结果、导出和异常状态的验证吗？, 关于接口业务结果、导出和异常状态的验证，能结合当前项目解释一下吗？]
category: yunshu
difficulty: 基础
priority: normal
projects: [云枢智慧城市数据平台]
keywords: [业务码, CSV, 异常状态]
---

# 接口业务结果、文件导出和异常状态

## 核心回答

我会组合 HTTP 状态和业务码来测，比如 HTTP 200 加业务 200、401、500，再试 HTTP 401、500、超时和缺字段，只有业务成功、关键数据存在才更新页面。

CSV 要检查文件名、类型、编码、表头和内容。地图、3D、看板也要分别看加载、空数据、部分失败和全部失败的显示。

【现在处理了其中一些情况，但这次没有实际运行，不能说这些都验证过。】

## 回答要点

- 我会组合 HTTP 状态和业务码来测，比如 HTTP 200 加业务 200、401、500，再试 HTTP 401、500、超时和缺字段，只有业务成功、关键数据存在才更新页面。
- CSV 要检查文件名、类型、编码、表头和内容。
- 现在处理了其中一些情况，但这次没有实际运行，不能说这些都验证过。

## 面试官可能追问

- CSV 下载成功后还需要核对哪些文件内容？
- 部分失败和全部失败的页面反馈应怎样区别？

## 代码证据

> **代码依据（不用于口述）**
>
> - [request.ts，第 73～110 行](/Users/aaron/personal-hub/apps/project-1/src/utils/request.ts:73)：业务 401/5xx 和 HTTP 401/5xx 的分支。
> - [authSession.ts，第 77～100 行](/Users/aaron/personal-hub/apps/project-1/src/services/authSession.ts:77)：刷新接口的数据结构和业务结果校验。
> - [Dashboard.tsx，第 94～124 行](/Users/aaron/personal-hub/apps/project-1/src/pages/Dashboard.tsx:94)：Blob 下载动作和对象 URL 清理。
> - [Map.tsx，第 395～407 行](/Users/aaron/personal-hub/apps/project-1/src/pages/Map.tsx:395)：地图加载、错误和空数据状态。
