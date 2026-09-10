---
id: yingke-followup-end-condition
title: 追问：到底条件为什么不能只判断 `start < total`？
aliases: [能讲讲项目中的分页到底条件的判断吗？, 关于分页到底条件的判断，能结合当前项目解释一下吗？]
category: yingke
difficulty: 基础
priority: normal
projects: [映刻影视]
keywords: [追问, start, total, hasMore]
---

# 追问：到底条件为什么不能只判断 `start < total`？

## 核心回答

start 只是请求的起始位置，不一定等于实际拿到的有效数据数量。接口返回不足一页、空数组或重复数据时，只比较 start 和 total 就可能不准。

我会请求结束后看列表长度和总数，有 hasMore 或 nextCursor 就按接口判断，再把正在加载、没有更多分开记录。

【还要检查最后一页会不会多发一次请求。】

## 回答要点

- start 只是请求的起始位置，不一定等于实际拿到的有效数据数量。
- 我会请求结束后看列表长度和总数，有 hasMore 或 nextCursor 就按接口判断，再把正在加载、没有更多分开记录。
- 还要检查最后一页会不会多发一次请求。

## 面试官可能追问

- 接口返回空数组但 total 较大时应该怎么办？
- 重复数据会怎样影响按列表长度判断结束？

## 代码证据

> **代码依据（不用于口述）**
>
> - [pages/list/index.vue 第 69～72 行](</Users/aaron/CodingPractice/14_uniapp/project2/pages/list/index.vue:69>)：追加结果并保存服务端总数。
> - [pages/list/index.vue 第 88～101 行](</Users/aaron/CodingPractice/14_uniapp/project2/pages/list/index.vue:88>)：当前仅根据 `startNum` 和 `totalNum` 判断是否到底。
