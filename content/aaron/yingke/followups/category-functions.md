---
id: yingke-followup-category-functions
title: 追问：首页为什么拆成三个请求函数，不直接写一个循环？
aliases: [能讲讲项目中的首页三个请求函数与循环的取舍吗？, 关于首页三个请求函数与循环的取舍，能结合当前项目解释一下吗？]
category: yingke
difficulty: 基础
priority: normal
projects: [映刻影视]
keywords: [追问, 分类配置, map, Promise]
---

# 追问：首页为什么拆成三个请求函数，不直接写一个循环？

## 核心回答

现在只有三个固定分类，分开写比较直接，一眼能看出分别请求什么。但参数和结构确实很像，分类多了就会重复。

【后面可以用配置数组保存分类 ID 和请求函数，再通过 map 生成 Promise 列表。如果一直只有这三个分类，保留简单写法也可以。】

## 回答要点

- 现在只有三个固定分类，分开写比较直接，一眼能看出分别请求什么。
- 后面可以用配置数组保存分类 ID 和请求函数，再通过 map 生成 Promise 列表。

## 面试官可能追问

- 新增更多分类后哪部分重复最明显？
- 配置数组怎样保留每个结果与分类的对应关系？

## 代码证据

> **代码依据（不用于口述）**
>
> - [pages/home/index.vue 第 50～67 行](</Users/aaron/CodingPractice/14_uniapp/project2/pages/home/index.vue:50>)：三个结构相似的分类请求方法。
> - [api/user.js 第 3～26 行](</Users/aaron/CodingPractice/14_uniapp/project2/api/user.js:3>)：三个分类 API 具有相同调用结构。
