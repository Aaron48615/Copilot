---
id: yingke-followup-storage-choice
title: 追问：为什么数据不存 LocalStorage 或 sessionStorage？
aliases: [能讲讲项目中的影视数据暂不使用持久化存储的原因吗？, 关于影视数据暂不使用持久化存储的原因，能结合当前项目解释一下吗？]
category: yingke
difficulty: 基础
priority: normal
projects: [映刻影视]
keywords: [追问, 页面状态, Storage, 缓存过期]
---

# 追问：为什么数据不存 LocalStorage 或 sessionStorage？

## 核心回答

目前主要是按分类 ID 和影片 ID 请求第三方影视数据，放在页面状态里用，没有使用 localStorage、sessionStorage 或小程序 Storage。项目比较小，也暂时不用处理缓存过期和更新。

【以后需要列表缓存，可以用小程序 Storage，再加版本和有效期。Token、第三方密钥不能和普通影视数据一样，单纯为了方便就随手缓存。】

## 回答要点

- 目前主要是按分类 ID 和影片 ID 请求第三方影视数据，放在页面状态里用，没有使用 localStorage、sessionStorage 或小程序 Storage。
- 以后需要列表缓存，可以用小程序 Storage，再加版本和有效期。

## 面试官可能追问

- 如果增加缓存，怎样避免长期展示过期影视数据？
- 小程序 Storage 与浏览器存储的使用环境有什么不同？

## 代码证据

> **代码依据（不用于口述）**
>
> - [pages/home/index.vue 第 22～30 行](</Users/aaron/CodingPractice/14_uniapp/project2/pages/home/index.vue:22>)：首页数据只保存在页面状态并在加载时请求。
> - [pages/list/index.vue 第 38～47 行](</Users/aaron/CodingPractice/14_uniapp/project2/pages/list/index.vue:38>)：列表和分页状态只保存在页面实例中。
