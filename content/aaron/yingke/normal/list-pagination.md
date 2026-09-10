---
id: yingke-normal-list-pagination
title: 分类列表和触底分页
aliases: [能讲讲项目中的分类列表和触底分页流程吗？, 关于分类列表和触底分页流程，能结合当前项目解释一下吗？]
category: yingke
difficulty: 基础
priority: normal
projects: [映刻影视]
keywords: [start/count, onShow, 分页]
---

# 分类列表和触底分页

## 核心回答

首页点“更多”时带上分类 ID，列表页在 onLoad 里接收，再选择对应的请求函数。分页用 startNum 记录起始位置，countNum 设成 8，返回后用 concat 追加，同时保存标题和总数。

触底时起始位置加 8，再查下一批，判断到底后提示“已经到底了”。这样前面浏览的内容会保留，点影片还能进详情。

【接口本身用 start、count，所以前端按这个格式传参。现在首次请求放在 onShow，从详情返回可能重复追加；连续触底没加请求锁，loading 也没等请求结束就关闭，这些还要完善。】

## 回答要点

- 首页点“更多”时带上分类 ID，列表页在 onLoad 里接收，再选择对应的请求函数。
- 触底时起始位置加 8，再查下一批，判断到底后提示“已经到底了”。
- 接口本身用 start、count，所以前端按这个格式传参。

## 面试官可能追问

- 从详情返回为什么可能重复追加列表？
- 连续触底时怎样避免请求乱序？

## 代码证据

> **代码依据（不用于口述）**
>
> - [components/listContent.vue 第 28～38 行](</Users/aaron/CodingPractice/14_uniapp/project2/components/listContent.vue:28>)：首页携带分类 ID 跳转列表页。
> - [pages/list/index.vue 第 38～48 行](</Users/aaron/CodingPractice/14_uniapp/project2/pages/list/index.vue:38>)：定义分类 ID、列表、分页游标、总数和加载状态。
> - [pages/list/index.vue 第 53～74 行](</Users/aaron/CodingPractice/14_uniapp/project2/pages/list/index.vue:53>)：根据分类 ID 选择接口，并追加分页结果。
> - [pages/list/index.vue 第 81～102 行](</Users/aaron/CodingPractice/14_uniapp/project2/pages/list/index.vue:81>)：接收路由参数、在 `onShow` 初始化并处理触底加载。
> - [api/list.js 第 3～26 行](</Users/aaron/CodingPractice/14_uniapp/project2/api/list.js:3>)：三个分类接口把 `start`、`count` 写入请求地址。
