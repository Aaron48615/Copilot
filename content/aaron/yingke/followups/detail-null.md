---
id: yingke-followup-detail-null
title: 追问：【高频】详情数据没回来时，`movieDetail.pic.large` 会发生什么？
aliases: [能讲讲项目中的详情未返回时的嵌套字段访问吗？, 关于详情未返回时的嵌套字段访问，能结合当前项目解释一下吗？]
category: yingke
difficulty: 基础
priority: high
projects: [映刻影视]
keywords: [追问, movieDetail, 空值, v-if]
---

# 追问：【高频】详情数据没回来时，`movieDetail.pic.large` 会发生什么？

## 核心回答

第一次渲染时 movieDetail 是空对象，pic 不存在，再读 large 就可能报错。我会加 `v-if="movieDetail.pic"`，有数据再显示，或者初始化需要的结构，再补加载、空数据、失败提示。

【目前详情查询已经有了，慢网和异常返回的处理还不完整。】

## 回答要点

- 第一次渲染时 movieDetail 是空对象，pic 不存在，再读 large 就可能报错。
- 目前详情查询已经有了，慢网和异常返回的处理还不完整。

## 面试官可能追问

- 接口成功但没有 pic 字段时加载状态应如何结束？
- 默认结构与条件渲染各适合什么情况？

## 代码证据

> **代码依据（不用于口述）**
>
> - [pages/detail/index.vue 第 1～9 行](</Users/aaron/CodingPractice/14_uniapp/project2/pages/detail/index.vue:1>)：模板直接读取 `movieDetail.pic.large`。
> - [pages/detail/index.vue 第 18～37 行](</Users/aaron/CodingPractice/14_uniapp/project2/pages/detail/index.vue:18>)：`movieDetail` 初始为空对象，请求后才赋值。
