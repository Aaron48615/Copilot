---
id: yingke-normal-category-reuse
title: 亮点二：用数据驱动方式复用三个首页分类
aliases: [能讲讲项目中的数据驱动的首页分类复用吗？, 关于数据驱动的首页分类复用，能结合当前项目解释一下吗？]
category: yingke
difficulty: 进阶
priority: high
projects: [映刻影视]
keywords: [亮点, listContent, 分类配置, 组件复用]
---

# 亮点二：用数据驱动方式复用三个首页分类

## 核心回答

首页三个分类只是数据不同，卡片、评分和跳转都一样，所以我把这些内容放进 listContent。首页负责请求数据，组件负责展示分类名称、总数和卡片，点更多再带分类 ID 跳转。

这样改一次布局，三个分类都能用，新加同样结构的分类也不用复制模板。

【现在传进去的是 allSettled 的整个结果对象，组件和请求写法还绑得比较紧。验证时会分别检查三个分类的名称、数量、首尾卡片和跳转参数，避免数据展示串了。】

## 回答要点

- 首页三个分类只是数据不同，卡片、评分和跳转都一样，所以我把这些内容放进 listContent。
- 这样改一次布局，三个分类都能用，新加同样结构的分类也不用复制模板。
- 现在传进去的是 allSettled 的整个结果对象，组件和请求写法还绑得比较紧。

## 面试官可能追问

- 新增一个同结构分类需要改哪些位置？
- 只传业务数据为什么更利于组件复用？

## 代码证据

> **代码依据（不用于口述）**
>
> - [pages/home/index.vue 第 7～9 行](</Users/aaron/CodingPractice/14_uniapp/project2/pages/home/index.vue:7>)：同一组件复用三次。
> - [pages/home/index.vue 第 36～67 行](</Users/aaron/CodingPractice/14_uniapp/project2/pages/home/index.vue:36>)：并发组织三个分类结果。
> - [components/listContent.vue 第 1～20 行](</Users/aaron/CodingPractice/14_uniapp/project2/components/listContent.vue:1>)：通用分类卡片结构。
> - [components/listContent.vue 第 24～38 行](</Users/aaron/CodingPractice/14_uniapp/project2/components/listContent.vue:24>)：组件数据入口和分类跳转。
