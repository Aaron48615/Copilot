---
id: yingke-normal-verify-business
title: 普通业务流程
aliases: [能讲讲项目中的影视业务流程的验证方法吗？, 关于影视业务流程的验证方法，能结合当前项目解释一下吗？]
category: yingke
difficulty: 基础
priority: normal
projects: [映刻影视]
keywords: [业务流程, 影片 ID, 文本边界]
---

# 普通业务流程

## 核心回答

我会从首页开始，看三个分类的标题、数量、封面和评分，以及是否各有 8 条首屏数据。然后分别点更多，检查分类和列表对应，多加载几页后再进详情，核对影片 ID、大图、副标题和简介。

【评论会分别试少于 50、刚好 50 和超过 50 个字符，看展开收起是否正确，点击会不会误进详情。目前没有自动化业务测试，这次也没运行，这里讲的是准备怎么验证。】

## 回答要点

- 我会从首页开始，看三个分类的标题、数量、封面和评分，以及是否各有 8 条首屏数据。
- 评论会分别试少于 50、刚好 50 和超过 50 个字符，看展开收起是否正确，点击会不会误进详情。

## 面试官可能追问

- 简介刚好 50 个字符时应检查什么？
- 怎样确认分类列表和详情的数据没有串题？

## 代码证据

> **代码依据（不用于口述）**
>
> - [pages/home/index.vue 第 3～10 行](</Users/aaron/CodingPractice/14_uniapp/project2/pages/home/index.vue:3>)：首页三个分类入口。
> - [pages/list/index.vue 第 5～24 行](</Users/aaron/CodingPractice/14_uniapp/project2/pages/list/index.vue:5>)：列表条目、评分、详情点击和简介入口。
> - [pages/detail/index.vue 第 1～10 行](</Users/aaron/CodingPractice/14_uniapp/project2/pages/detail/index.vue:1>)：详情需要核对的展示字段。
