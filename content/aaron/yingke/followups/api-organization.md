---
id: yingke-followup-api-organization
title: 追问：首页 API 和列表 API 为什么分成 `user.js`、`list.js`，但代码又很相似？
aliases: [能讲讲项目中的user.js 和 list.js 的划分及重复吗？, 关于user.js 和 list.js 的划分及重复，能结合当前项目解释一下吗？]
category: yingke
difficulty: 基础
priority: normal
projects: [映刻影视]
keywords: [追问, API 命名, 公共函数, 分类配置]
---

# 追问：首页 API 和列表 API 为什么分成 `user.js`、`list.js`，但代码又很相似？

## 核心回答

现在是按页面拆的，首页用 user.js，列表用 list.js，但 user.js 这个名字不准确，里面三个分类函数也跟列表很像。

我会整理成 `getCollectionItems(collectionId, start, count)`，分类 ID 放配置表，让首页和列表共用。

【如果两个页面的接口含义或数据处理确实不同，再分开写。现在的问题主要是命名和重复代码。】

## 回答要点

- 现在是按页面拆的，首页用 user.js，列表用 list.js，但 user.js 这个名字不准确，里面三个分类函数也跟列表很像。
- 我会整理成 `getCollectionItems(collectionId, start, count)`，分类 ID 放配置表，让首页和列表共用。
- 如果两个页面的接口含义或数据处理确实不同，再分开写。

## 面试官可能追问

- 两个页面数据转换不同还适合共用一层吗？
- 分类 ID 放配置表后如何减少遗漏修改？

## 代码证据

> **代码依据（不用于口述）**
>
> - [api/user.js 第 3～26 行](</Users/aaron/CodingPractice/14_uniapp/project2/api/user.js:3>)：首页分别定义三个固定分类接口。
> - [api/list.js 第 3～26 行](</Users/aaron/CodingPractice/14_uniapp/project2/api/list.js:3>)：列表再次定义结构相同的三个分页接口。
