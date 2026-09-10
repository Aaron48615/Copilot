---
id: yingke-normal-pagination-state-gap
title: 不足三：分页缺少重入、并发和 loading 收口
aliases: [能讲讲项目中的分页重入、并发与 loading 的缺口吗？, 关于分页重入、并发与 loading 的缺口，能结合当前项目解释一下吗？]
category: yingke
difficulty: 基础
priority: normal
projects: [映刻影视]
keywords: [不足, onLoad, isLoading, hasMore]
---

# 不足三：分页缺少重入、并发和 loading 收口

## 核心回答

分页有三个地方要改：onShow 每次回来都请求，可能重复追加；连续触底没有锁；请求没结束就 hideLoading，提示会很快消失。

我会把首次请求放到 onLoad，补初始化标记、isLoading 和 hasMore，在 finally 里关闭 loading，再按影片 ID 去重。

【基础分页已经有了，但这些状态处理和实际稳定性还需要补充验证。】

## 回答要点

- 分页有三个地方要改：onShow 每次回来都请求，可能重复追加；连续触底没有锁；请求没结束就 hideLoading，提示会很快消失。
- 我会把首次请求放到 onLoad，补初始化标记、isLoading 和 hasMore，在 finally 里关闭 loading，再按影片 ID 去重。
- 基础分页已经有了，但这些状态处理和实际稳定性还需要补充验证。

## 面试官可能追问

- 请求失败后锁和 loading 应如何释放？
- 按影片 ID 去重能否代替请求锁？

## 代码证据

> **代码依据（不用于口述）**
>
> - [pages/list/index.vue 第 38～48 行](</Users/aaron/CodingPractice/14_uniapp/project2/pages/list/index.vue:38>)：缺少请求锁、是否到底和初始化标记。
> - [pages/list/index.vue 第 64～74 行](</Users/aaron/CodingPractice/14_uniapp/project2/pages/list/index.vue:64>)：返回后直接追加，没有去重。
> - [pages/list/index.vue 第 81～102 行](</Users/aaron/CodingPractice/14_uniapp/project2/pages/list/index.vue:81>)：`onShow` 重入以及未等待请求就关闭 loading。
