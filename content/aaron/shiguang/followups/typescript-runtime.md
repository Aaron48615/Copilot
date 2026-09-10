---
id: shiguang-followup-typescript-runtime
title: 追问：项目使用了 TypeScript，为什么还有 any？写了类型就能保证接口数据正确吗？
aliases: [能讲讲项目中的项目中的 any 和运行时校验吗？, 关于项目中的 any 和运行时校验，能结合当前项目解释一下吗？]
category: shiguang
difficulty: 进阶
priority: normal
projects: [拾光集移动商城系统]
keywords: [追问, TypeScript, any, 运行时校验]
---

# 追问：项目使用了 TypeScript，为什么还有 any？写了类型就能保证接口数据正确吗？

## 核心回答

项目是 JavaScript 和 TypeScript 混着写的，请求层有公共响应类型和泛型，一些页面有业务类型，但旧 API 参数和默认泛型还留着 any，没有补完整。

TypeScript 只在开发、构建时检查，接口返回 JSON 时不会自动校验，所以外部数据还得检查。后面我会先补商品、SKU、购物车和订单的核心类型，再逐步收紧 any、校验响应结构，统一处理 `success: false`。

【首页已经检查 success 和数组，AI 代理也会从 unknown 检查 prompt 类型和长度。但加购、订单列表的部分操作还只看请求有没有返回，HTTP 200 不代表付款或收货成功。类型检查、单测、页面操作和真实接口验证各有作用，不能用构建通过代替功能验证。】

## 回答要点

- 项目是 JavaScript 和 TypeScript 混着写的，请求层有公共响应类型和泛型，一些页面有业务类型，但旧 API 参数和默认泛型还留着 any，没有补完整。
- TypeScript 只在开发、构建时检查，接口返回 JSON 时不会自动校验，所以外部数据还得检查。
- 首页已经检查 success 和数组，AI 代理也会从 unknown 检查 prompt 类型和长度。

## 面试官可能追问

- 优先收紧商品和订单类型有什么理由？
- 类型检查通过为什么不能证明接口业务操作成功？

## 代码证据

> **代码依据（不用于口述）**
> - [request.ts 第 6～15、58～73 行](/Users/aaron/personal-hub/apps/project-2/src/utils/request.ts:6)：公共响应接口、泛型和保留的 any。
> - [homeData.ts 第 20～34 行](/Users/aaron/personal-hub/apps/project-2/src/utils/homeData.ts:20)：对业务状态和数组结构做运行时检查。
> - [AI 代理第 123～138 行](/Users/aaron/personal-hub/apps/project-2/api/ai.ts:123)：对 unknown 请求体做实际类型和长度检查。
> - [商品详情第 438～447 行](/Users/aaron/personal-hub/apps/project-2/src/views/ProdInfo.vue:438)：加购请求返回后直接提示成功。
> - [订单列表第 194～242 行](/Users/aaron/personal-hub/apps/project-2/src/views/MyOrder.vue:194)：付款和收货操作未统一检查业务成功字段。
