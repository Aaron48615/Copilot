---
id: yingke-normal-api-duplication-gap
title: 不足六：API 定义存在重复和命名不清楚
aliases: [能讲讲项目中的影视 API 重复和命名问题吗？, 关于影视 API 重复和命名问题，能结合当前项目解释一下吗？]
category: yingke
difficulty: 基础
priority: normal
projects: [映刻影视]
keywords: [不足, API 封装, 分类 ID, 重复代码]
---

# 不足六：API 定义存在重复和命名不清楚

## 核心回答

首页和列表都各写了三个分类请求，地址和参数很相似，首页文件还叫 user.js，看名字不容易知道是影视接口。

我会把它们整理成 `getCollectionItems(collectionId, start, count)`，分类 ID 放配置表，文件也按影视集合命名。

【现在按页面拆文件比较好理解，但分类变多后重复会增加，修改接口也容易漏，所以这部分值得整理。】

## 回答要点

- 首页和列表都各写了三个分类请求，地址和参数很相似，首页文件还叫 user.js，看名字不容易知道是影视接口。
- 我会把它们整理成 `getCollectionItems(collectionId, start, count)`，分类 ID 放配置表，文件也按影视集合命名。
- 现在按页面拆文件比较好理解，但分类变多后重复会增加，修改接口也容易漏，所以这部分值得整理。

## 面试官可能追问

- 首页与列表接口共用时哪些参数应保留？
- 什么情况下仍适合按页面分别封装 API？

## 代码证据

> **代码依据（不用于口述）**
>
> - [api/user.js 第 3～26 行](</Users/aaron/CodingPractice/14_uniapp/project2/api/user.js:3>)：首页重复定义三个固定分页接口。
> - [api/list.js 第 3～26 行](</Users/aaron/CodingPractice/14_uniapp/project2/api/list.js:3>)：列表页再次定义结构相同的三个接口。
> - [pages/list/index.vue 第 54～61 行](</Users/aaron/CodingPractice/14_uniapp/project2/pages/list/index.vue:54>)：使用条件分支选择分类函数。
