---
id: yingke-followup-list-key
title: 追问：【高频】为什么列表的 `key` 使用 `index`，不用影片 ID？
aliases: [能讲讲项目中的列表使用 index 和影片 ID 的区别吗？, 关于列表使用 index 和影片 ID 的区别，能结合当前项目解释一下吗？]
category: yingke
difficulty: 基础
priority: high
projects: [映刻影视]
keywords: [追问, key, 影片 ID, 节点复用]
---

# 追问：【高频】为什么列表的 `key` 使用 `index`，不用影片 ID？

## 核心回答

现在用了 index，但影片 ID 更合适。index 是位置，排序或插入以后，同一个位置可能换成另一部影片，容易复用到不合适的节点。数据里有 item.id，我会直接改成 `:key="item.id"`。

【完全静态、不改顺序的列表用 index 问题少一些，这里的列表会更新，用 ID 更稳妥。】

## 回答要点

- 现在用了 index，但影片 ID 更合适。
- 完全静态、不改顺序的列表用 index 问题少一些，这里的列表会更新，用 ID 更稳妥。

## 面试官可能追问

- 列表前面插入一条数据时 index key 会怎样变化？
- 完全静态列表使用 index 的风险为什么较小？

## 代码证据

> **代码依据（不用于口述）**
>
> - [pages/list/index.vue 第 6～7 行](</Users/aaron/CodingPractice/14_uniapp/project2/pages/list/index.vue:6>)：分页列表使用 index 作为 key，同时条目中存在影片 ID。
> - [components/listContent.vue 第 13～17 行](</Users/aaron/CodingPractice/14_uniapp/project2/components/listContent.vue:13>)：首页卡片列表同样使用 index 作为 key。
