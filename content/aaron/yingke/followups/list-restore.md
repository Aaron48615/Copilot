---
id: yingke-followup-list-restore
title: 追问：从详情页返回后怎样保留原来的滚动位置和列表？
aliases: [能讲讲项目中的详情返回后的列表和滚动保留吗？, 关于详情返回后的列表和滚动保留，能结合当前项目解释一下吗？]
category: yingke
difficulty: 基础
priority: normal
projects: [映刻影视]
keywords: [追问, 页面栈, onShow, 列表缓存]
---

# 追问：从详情页返回后怎样保留原来的滚动位置和列表？

## 核心回答

列表页还在页面栈里时，页面实例和数据通常都还在，只在第一次进入时加载，就能保留原来的列表和滚动状态，不要每次 onShow 都重新请求。

【页面会销毁时，再考虑缓存列表、分页和滚动位置。现在先解决返回后重复初始化，不一定马上加全局状态。】

## 回答要点

- 列表页还在页面栈里时，页面实例和数据通常都还在，只在第一次进入时加载，就能保留原来的列表和滚动状态，不要每次 onShow 都重新请求。
- 页面会销毁时，再考虑缓存列表、分页和滚动位置。

## 面试官可能追问

- 页面已经销毁时仅依赖页面状态还够吗？
- 缓存分页和滚动位置时需要同时保留哪些信息？

## 代码证据

> **代码依据（不用于口述）**
>
> - [pages/list/index.vue 第 38～47 行](</Users/aaron/CodingPractice/14_uniapp/project2/pages/list/index.vue:38>)：列表和分页状态保存在页面实例中。
> - [pages/list/index.vue 第 81～87 行](</Users/aaron/CodingPractice/14_uniapp/project2/pages/list/index.vue:81>)：页面重新可见时再次初始化。
