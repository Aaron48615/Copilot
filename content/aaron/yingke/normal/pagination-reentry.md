---
id: yingke-normal-pagination-reentry
title: 难点二：分页状态会受到页面重入和连续触底影响
aliases: [能讲讲项目中的页面重入和连续触底的分页影响吗？, 关于页面重入和连续触底的分页影响，能结合当前项目解释一下吗？]
category: yingke
difficulty: 进阶
priority: high
projects: [映刻影视]
keywords: [难点, onShow, 请求锁, 分页状态]
---

# 难点二：分页状态会受到页面重入和连续触底影响

## 核心回答

分页不只是把 start 加 8，还得考虑返回页面和连续触底。现在从详情返回会再触发 onShow，但列表和起始位置没清掉，就可能重复 concat；前一个请求没结束又触底，也可能重复请求或乱序。

我会先明确只在首次进入时加载，再加请求锁，并让 loading 跟着请求结束，处理好这些状态以后分页才比较稳。

【验证时会记录每次 start 和返回的影片 ID，连续触底、进详情再返回，检查是否重复。这次没有运行项目，不能把这些情况说成已经测过。】

## 回答要点

- 分页不只是把 start 加 8，还得考虑返回页面和连续触底。
- 我会先明确只在首次进入时加载，再加请求锁，并让 loading 跟着请求结束，处理好这些状态以后分页才比较稳。
- 验证时会记录每次 start 和返回的影片 ID，连续触底、进详情再返回，检查是否重复。

## 面试官可能追问

- 请求中离开再返回，初始化状态应怎样处理？
- 怎样验证列表没有重复追加相同影片？

## 代码证据

> **代码依据（不用于口述）**
>
> - [pages/list/index.vue 第 38～48 行](</Users/aaron/CodingPractice/14_uniapp/project2/pages/list/index.vue:38>)：现有分页状态中没有请求锁或已初始化标记。
> - [pages/list/index.vue 第 64～74 行](</Users/aaron/CodingPractice/14_uniapp/project2/pages/list/index.vue:64>)：请求返回后直接使用 `concat` 追加。
> - [pages/list/index.vue 第 81～102 行](</Users/aaron/CodingPractice/14_uniapp/project2/pages/list/index.vue:81>)：`onShow` 重入、触底递增和未等待请求的 loading 逻辑。
