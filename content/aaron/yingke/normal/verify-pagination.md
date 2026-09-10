---
id: yingke-normal-verify-pagination
title: 异步请求和分页
aliases: [能讲讲项目中的异步请求与分页的验证方法吗？, 关于异步请求与分页的验证方法，能结合当前项目解释一下吗？]
category: yingke
difficulty: 基础
priority: normal
projects: [映刻影视]
keywords: [慢网, 请求乱序, 影片 ID]
---

# 异步请求和分页

## 核心回答

我会模拟慢网、超时和单接口失败，看首页某个分类失败会不会影响其他分类。分页重点试连续触底、最后一页不足 8 条、进详情再返回，以及请求乱序，检查 start 是否按 0、8、16 增加，再用影片 ID 看有没有重复。

【现在还没有请求锁、取消或结果编号，这些场景可能暴露问题，但本次没有实际运行，不能说已经发生过。】

## 回答要点

- 我会模拟慢网、超时和单接口失败，看首页某个分类失败会不会影响其他分类。
- 现在还没有请求锁、取消或结果编号，这些场景可能暴露问题，但本次没有实际运行，不能说已经发生过。

## 面试官可能追问

- 最后一页不足 8 条时如何验证到底状态？
- 从详情返回应记录哪些请求来判断重复加载？

## 代码证据

> **代码依据（不用于口述）**
>
> - [pages/home/index.vue 第 36～48 行](</Users/aaron/CodingPractice/14_uniapp/project2/pages/home/index.vue:36>)：首页并发结果处理位置。
> - [pages/list/index.vue 第 64～74 行](</Users/aaron/CodingPractice/14_uniapp/project2/pages/list/index.vue:64>)：分页数据追加位置。
> - [pages/list/index.vue 第 81～102 行](</Users/aaron/CodingPractice/14_uniapp/project2/pages/list/index.vue:81>)：生命周期重入和触底请求位置。
