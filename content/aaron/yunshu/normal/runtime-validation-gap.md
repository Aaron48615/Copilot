---
id: yunshu-normal-runtime-validation-gap
title: 不足五：接口运行时校验和错误分层不统一
aliases: [能讲讲项目中的接口运行时校验和错误分层的缺口吗？, 关于接口运行时校验和错误分层的缺口，能结合当前项目解释一下吗？]
category: yunshu
difficulty: 进阶
priority: normal
projects: [云枢智慧城市数据平台]
keywords: [不足, TypeScript, 运行时校验, 业务码]
---

# 不足五：接口运行时校验和错误分层不统一

## 核心回答

TypeScript 类型不会自动校验接口实际返回。现在首页直接断言 response.data，请求统一层只特殊处理业务 401 和 5xx，HTTP 200 但业务 400、字段缺失或类型改变时，可能出现空图、提示不一致或报错。

我会在 API 收到数据时用 Zod 这类工具检查结构，再统一业务码、HTTP 错误和 Blob 错误处理。

【刷新接口、地图转换和部分页面已经做了运行时检查，但还没统一。有类型声明不等于数据一定正确。】

## 回答要点

- TypeScript 类型不会自动校验接口实际返回。
- 我会在 API 收到数据时用 Zod 这类工具检查结构，再统一业务码、HTTP 错误和 Blob 错误处理。
- 刷新接口、地图转换和部分页面已经做了运行时检查，但还没统一。

## 面试官可能追问

- as 断言为什么不会把错误字符串变成数字？
- Blob 错误为什么不能直接按 JSON 业务码处理？

## 代码证据

> **代码依据（不用于口述）**
>
> - [authSession.ts，第 77～100 行](/Users/aaron/personal-hub/apps/project-1/src/services/authSession.ts:77)：刷新响应做了业务码和关键字段运行时校验。
> - [mapData.ts，第 31～73 行](/Users/aaron/personal-hub/apps/project-1/src/utils/mapData.ts:31)：地图数据做数字转换和经纬度范围过滤。
> - [Dashboard.tsx，第 486～497 行](/Users/aaron/personal-hub/apps/project-1/src/pages/Dashboard.tsx:486)：首页直接使用类型断言写入响应数据。
> - [request.ts，第 73～110 行](/Users/aaron/personal-hub/apps/project-1/src/utils/request.ts:73)：统一层只专门处理业务 401、业务 5xx 和 HTTP 401/5xx。
