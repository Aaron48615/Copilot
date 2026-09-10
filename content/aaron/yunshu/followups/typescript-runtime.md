---
id: yunshu-followup-typescript-runtime
title: 追问：用了 TypeScript，为什么还要校验接口数据？as 类型不是已经转换了吗？
aliases: [能讲讲项目中的as 断言与运行时数据校验的区别吗？, 关于as 断言与运行时数据校验的区别，能结合当前项目解释一下吗？]
category: yunshu
difficulty: 进阶
priority: normal
projects: [云枢智慧城市数据平台]
keywords: [追问, TypeScript, as, 运行时校验]
---

# 追问：用了 TypeScript，为什么还要校验接口数据？as 类型不是已经转换了吗？

## 核心回答

as 只是告诉 TypeScript 按什么类型理解，运行时就没了，不会把错误 JSON 转成正确数据。首页直接断言 response.data，字段缺失或数字变成异常字符串，拿到的仍是原始值。

地图里实际执行 Number、有限数字和经纬度检查，才算运行时处理，Token 刷新也检查业务码、Token 和用户字段。

【这些还没有统一，AI 事件解析后也只是类型断言。后面可以在 API 边界用 schema 校验 unknown，确认结构再交给页面。】

## 回答要点

- as 只是告诉 TypeScript 按什么类型理解，运行时就没了，不会把错误 JSON 转成正确数据。
- 地图里实际执行 Number、有限数字和经纬度检查，才算运行时处理，Token 刷新也检查业务码、Token 和用户字段。
- 这些还没有统一，AI 事件解析后也只是类型断言。

## 面试官可能追问

- Number 转换后为什么还需要有限数字和范围检查？
- API 边界接收 unknown 后应在何时交给页面？

## 代码证据

> **代码依据（不用于口述）**
>
> - [Dashboard.tsx，第 488～497 行](/Users/aaron/personal-hub/apps/project-1/src/pages/Dashboard.tsx:488)：首页直接使用 TypeScript 类型断言。
> - [mapData.ts，第 31～73 行](/Users/aaron/personal-hub/apps/project-1/src/utils/mapData.ts:31)：数字转换和经纬度范围的运行时校验。
> - [authSession.ts，第 85～91 行](/Users/aaron/personal-hub/apps/project-1/src/services/authSession.ts:85)：刷新接口关键字段的运行时检查。
> - [AI.tsx，第 198～204 行](/Users/aaron/personal-hub/apps/project-1/src/pages/AI.tsx:198)：JSON 解析后直接断言 AiEvent，没有继续检查字段结构。
