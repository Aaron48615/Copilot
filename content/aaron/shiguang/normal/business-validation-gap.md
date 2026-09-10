---
id: shiguang-normal-business-validation-gap
title: 不足六：AI 文案和订单结果还需要更严格的业务校验
aliases: [能讲讲项目中的AI 文案和订单业务结果的校验缺口吗？, 关于AI 文案和订单业务结果的校验缺口，能结合当前项目解释一下吗？]
category: shiguang
difficulty: 基础
priority: normal
projects: [拾光集移动商城系统]
keywords: [不足, AI 卖点, 业务校验, 订单]
---

# 不足六：AI 文案和订单结果还需要更严格的业务校验

## 核心回答

原来的 AI 卖点还比较依赖提示词，拿到结果主要是按换行拆开，没有严格检查重复、长度和内容有没有依据。后面我会补输出格式检查，也尽量只用商品真实提供的属性，不随便生成商品没有的保障。

订单列表也有部分付款、确认收货操作，是请求正常返回就提示成功，没有统一检查 `success: false`。这里应该再判断业务结果，服务端明确成功后才提示并更新页面。

【本地兜底里也有“正品、物流、售后”这些表达，不能因为是本地写死的就认为可靠，商品或店铺没提供相应保障，就不应该直接展示。】

## 回答要点

- 原来的 AI 卖点还比较依赖提示词，拿到结果主要是按换行拆开，没有严格检查重复、长度和内容有没有依据。
- 订单列表也有部分付款、确认收货操作，是请求正常返回就提示成功，没有统一检查 `success: false`。
- 本地兜底里也有“正品、物流、售后”这些表达，不能因为是本地写死的就认为可靠，商品或店铺没提供相应保障，就不应该直接展示。

## 面试官可能追问

- 本地写死的售后承诺为什么也需要核实？
- 确认收货返回 success 为 false 时页面应该怎样处理？

## 代码证据

> **代码依据（不用于口述）**
> - [卖点提示词和回退第 43～75 行](/Users/aaron/personal-hub/apps/project-2/src/ai/search.js:43)：格式要求和含业务承诺的本地文案。
> - [详情解析第 361～371 行](/Users/aaron/personal-hub/apps/project-2/src/views/ProdInfo.vue:361)：主要按换行拆分模型结果。
> - [订单列表第 194～242 行](/Users/aaron/personal-hub/apps/project-2/src/views/MyOrder.vue:194)：付款和确认收货后直接提示并重载。
> - [request.ts 第 44～55 行](/Users/aaron/personal-hub/apps/project-2/src/utils/request.ts:44)：响应拦截器没有统一拒绝业务失败。
