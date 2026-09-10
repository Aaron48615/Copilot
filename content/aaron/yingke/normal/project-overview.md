---
id: yingke-normal-project-overview
title: 项目介绍
aliases: [能讲讲项目中的映刻影视的项目介绍吗？, 关于映刻影视的项目介绍，能结合当前项目解释一下吗？]
category: yingke
difficulty: 基础
priority: high
projects: [映刻影视]
keywords: [uni-app, Vue 2, 影视浏览]
---

# 项目介绍

## 核心回答

映刻影视是我用 uni-app 做的影视信息浏览小程序，主要让用户查看影视分类、评分和简介。首页有国产剧、综艺和美剧三个分类，卡片里展示封面、标题、星级和评分。点“更多”进入分类列表，往下滑可以继续加载，点影片再看大图封面、副标题和剧情简介。

项目主要分成首页、分类列表、详情页、公共组件和请求层，用了 Vue 2、JavaScript、Less、uni-app 和 Vant Weapp。我印象比较深的是 Axios 请求适配、首页分类卡片复用、触底分页，还有简介的展开和收起。

【请求最终通过自定义 adapter 调用 `uni.request`。首页同时查三个分类，列表用 start、count 分页，长简介则拆成组件处理。目前只核对了源码，项目是否上线、第三方接口现在是否可用，还没有确认。】

## 回答要点

- 映刻影视是我用 uni-app 做的影视信息浏览小程序，主要让用户查看影视分类、评分和简介。
- 项目主要分成首页、分类列表、详情页、公共组件和请求层，用了 Vue 2、JavaScript、Less、uni-app 和 Vant Weapp。
- 请求最终通过自定义 adapter 调用 `uni.request`。

## 面试官可能追问

- 首页、分类列表和详情页之间传递哪些信息？
- 目前哪些跨端和线上结论还没有验证依据？

## 代码证据

> **代码依据（不用于口述）**
>
> - [pages.json 第 2～20 行](</Users/aaron/CodingPractice/14_uniapp/project2/pages.json:2>)：注册首页、分类列表页和详情页。
> - [manifest.json 第 52～71 行](</Users/aaron/CodingPractice/14_uniapp/project2/manifest.json:52>)：小程序相关配置以及 Vue 2 版本声明。
> - [package.json 第 12～16 行](</Users/aaron/CodingPractice/14_uniapp/project2/package.json:12>)：声明 Vant Weapp、Axios 和 axios-miniprogram 依赖。
> - [pages/home/index.vue 第 1～20 行](</Users/aaron/CodingPractice/14_uniapp/project2/pages/home/index.vue:1>)：首页三个分类区域以及 API、组件入口。
> - [pages/list/index.vue 第 1～25 行](</Users/aaron/CodingPractice/14_uniapp/project2/pages/list/index.vue:1>)：分类列表展示、评分、简介和详情入口。
> - [pages/detail/index.vue 第 1～10 行](</Users/aaron/CodingPractice/14_uniapp/project2/pages/detail/index.vue:1>)：影视详情页的展示字段。
