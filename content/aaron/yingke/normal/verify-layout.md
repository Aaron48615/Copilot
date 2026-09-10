---
id: yingke-normal-verify-layout
title: 移动端布局
aliases: [能讲讲项目中的移动端布局的验证方法吗？, 关于移动端布局的验证方法，能结合当前项目解释一下吗？]
category: yingke
difficulty: 基础
priority: normal
projects: [映刻影视]
keywords: [rpx, 真机, 安全区域]
---

# 移动端布局

## 核心回答

我会换几个模拟器尺寸，再用真机检查横向卡片能不能滑完整、列表封面和文字会不会挤、长标题是否省略、详情大图有没有超出。横竖屏和安全区域变化时，也要看内容有没有被挡住。

【项目混用了 rpx 和少量 px，比例需要实际检查。目前有适配单位和固定视口尺寸，但没有视觉回归测试，不能说所有设备都适配好了。】

## 回答要点

- 我会换几个模拟器尺寸，再用真机检查横向卡片能不能滑完整、列表封面和文字会不会挤、长标题是否省略、详情大图有没有超出。
- 项目混用了 rpx 和少量 px，比例需要实际检查。

## 面试官可能追问

- 横向卡片最后一项被截住时如何定位？
- 系统字体放大后需要额外检查哪些内容？

## 代码证据

> **代码依据（不用于口述）**
>
> - [components/listContent.vue 第 67～99 行](</Users/aaron/CodingPractice/14_uniapp/project2/components/listContent.vue:67>)：横向滚动、卡片固定 `rpx` 尺寸和标题省略。
> - [pages/list/index.vue 第 106～177 行](</Users/aaron/CodingPractice/14_uniapp/project2/pages/list/index.vue:106>)：列表的 `rpx` 布局及像素边框。
> - [pages/detail/index.vue 第 41～56 行](</Users/aaron/CodingPractice/14_uniapp/project2/pages/detail/index.vue:41>)：详情页使用 `vw`、`vh` 和 `rpx` 的布局。
