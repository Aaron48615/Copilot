---
id: yingke-followup-offset-pagination
title: 追问：为什么用 `start/count`，不用 `page/pageSize`？
aliases: [能讲讲项目中的start/count 与页码分页的选择吗？, 关于start/count 与页码分页的选择，能结合当前项目解释一下吗？]
category: yingke
difficulty: 基础
priority: normal
projects: [映刻影视]
keywords: [追问, start/count, 偏移分页, 游标]
---

# 追问：为什么用 `start/count`，不用 `page/pageSize`？

## 核心回答

因为接口要求的是“从第几条开始、取多少条”，所以用 start、count。接口如果接收页码，就会换成 page、pageSize，这里主要跟接口约定走。

【偏移分页比较直接，但数据频繁插入时位置会变化，可能重复或遗漏。那种场景可以让服务端提供稳定的游标分页。】

## 回答要点

- 因为接口要求的是“从第几条开始、取多少条”，所以用 start、count。
- 偏移分页比较直接，但数据频繁插入时位置会变化，可能重复或遗漏。

## 面试官可能追问

- 数据在前面插入时偏移分页可能有什么问题？
- 使用 nextCursor 后前端的下一页判断怎样变化？

## 代码证据

> **代码依据（不用于口述）**
>
> - [pages/list/index.vue 第 44～45 行](</Users/aaron/CodingPractice/14_uniapp/project2/pages/list/index.vue:44>)：页面用 `startNum`、`countNum` 保存分页参数。
> - [api/list.js 第 3～26 行](</Users/aaron/CodingPractice/14_uniapp/project2/api/list.js:3>)：三个分类接口使用 `start` 和 `count`。
