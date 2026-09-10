---
id: yingke-followup-rpx-px
title: 追问：为什么同时使用 `rpx` 和 `px`？
aliases: [能讲讲项目中的rpx 与 px 混用的原因吗？, 关于rpx 与 px 混用的原因，能结合当前项目解释一下吗？]
category: yingke
difficulty: 基础
priority: normal
projects: [映刻影视]
keywords: [追问, rpx, px, 设备适配]
---

# 追问：为什么同时使用 `rpx` 和 `px`？

## 核心回答

卡片大小、字号和间距用 rpx，能跟着屏幕宽度换算；细边框会用 px，有些第三方组件参数本来也是按像素接收的。

【混用本身不一定有问题，但需要统一规则，再换设备检查。代码里有 rpx，也有 1px、2px 的边框和像素间距，不能只看单位就说所有屏幕效果都合适。】

## 回答要点

- 卡片大小、字号和间距用 rpx，能跟着屏幕宽度换算；细边框会用 px，有些第三方组件参数本来也是按像素接收的。
- 混用本身不一定有问题，但需要统一规则，再换设备检查。

## 面试官可能追问

- 第三方组件按 px 收参数时怎样与 rpx 布局对齐？
- 为什么只看到适配单位不能证明真机布局正确？

## 代码证据

> **代码依据（不用于口述）**
>
> - [pages/list/index.vue 第 106～177 行](</Users/aaron/CodingPractice/14_uniapp/project2/pages/list/index.vue:106>)：列表布局大量使用 `rpx`，边框使用 `px`。
> - [components/listContent.vue 第 76～99 行](</Users/aaron/CodingPractice/14_uniapp/project2/components/listContent.vue:76>)：首页卡片尺寸、字号和间距使用 `rpx`。
