---
id: yingke-followup-vant-ownership
title: 追问：Vant 目录中的代码是你自己写的吗？
aliases: [能讲讲项目中的Vant 代码与个人实现的职责边界吗？, 关于Vant 代码与个人实现的职责边界，能结合当前项目解释一下吗？]
category: yingke
difficulty: 基础
priority: normal
projects: [映刻影视]
keywords: [追问, Vant Weapp, 第三方组件, 业务实现]
---

# 追问：Vant 目录中的代码是你自己写的吗？

## 核心回答

不是，wxcomponents/vant 是第三方 Vant Weapp 代码。我做的是接入依赖、全局注册，再把评分、图标、Loading、Skeleton 和 Toast 用到页面里。

自己写的主要是数据请求、分类组织、分页、路由和业务组件组合，能介绍组件为什么选、怎么用，不能把内部实现说成自己写的。

## 回答要点

- 不是，wxcomponents/vant 是第三方 Vant Weapp 代码。
- 自己写的主要是数据请求、分类组织、分页、路由和业务组件组合，能介绍组件为什么选、怎么用，不能把内部实现说成自己写的。

## 面试官可能追问

- 面试时怎样说明组件接入与组件研发的区别？
- 更换评分组件会影响哪些自己的业务代码？

## 代码证据

> **代码依据（不用于口述）**
>
> - [package.json 第 12～15 行](</Users/aaron/CodingPractice/14_uniapp/project2/package.json:12>)：项目声明 `@vant/weapp` 第三方依赖。
> - [pages.json 第 28～34 行](</Users/aaron/CodingPractice/14_uniapp/project2/pages.json:28>)：将 Vant Weapp 组件注册到项目中。
