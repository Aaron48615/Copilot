---
id: yingke-followup-pagination-lock
title: 追问：【高频】触底分页怎么防止连续触发和重复请求？
aliases: [能讲讲项目中的触底分页的重复请求控制吗？, 关于触底分页的重复请求控制，能结合当前项目解释一下吗？]
category: yingke
difficulty: 基础
priority: high
projects: [映刻影视]
keywords: [追问, isLoading, hasMore, finally]
---

# 追问：【高频】触底分页怎么防止连续触发和重复请求？

## 核心回答

现在还没有请求锁，我会加 isLoading 和 hasMore。触底时先检查，正在请求或没有下一页就不发；开始时加锁，在 finally 里释放，拿到数据后按 list.length 和 total 更新是否还有更多。

【如果接口有 next cursor，也可以用它判断下一页。目前连续触底可能发多个请求，后发的先回来就会影响追加顺序，所以先通过请求锁保证一次只加载一页。首页三个分类分别保存结果，没有同一个列表的追加顺序问题。以后有必须并发、又会更新同一份状态的请求，再考虑编号或取消旧请求，这些目前都是改进方案。】

## 回答要点

- 现在还没有请求锁，我会加 isLoading 和 hasMore。
- 如果接口有 next cursor，也可以用它判断下一页。

## 面试官可能追问

- 上一页请求失败时分页位置应该怎样处理？
- 去重为什么不能单独解决响应乱序？

## 代码证据

> **代码依据（不用于口述）**
>
> - [pages/list/index.vue 第 38～48 行](</Users/aaron/CodingPractice/14_uniapp/project2/pages/list/index.vue:38>)：当前分页状态中没有请求锁和 `hasMore`。
> - [pages/list/index.vue 第 88～101 行](</Users/aaron/CodingPractice/14_uniapp/project2/pages/list/index.vue:88>)：触底后直接递增并请求，没有并发保护。
