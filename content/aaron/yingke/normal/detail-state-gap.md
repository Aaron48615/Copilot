---
id: yingke-normal-detail-state-gap
title: 不足四：详情页缺少加载期空值和异常保护
aliases: [能讲讲项目中的详情页空值和异常状态保护的不足吗？, 关于详情页空值和异常状态保护的不足，能结合当前项目解释一下吗？]
category: yingke
difficulty: 基础
priority: normal
projects: [映刻影视]
keywords: [不足, 空值保护, v-if, 错误状态]
---

# 不足四：详情页缺少加载期空值和异常保护

## 核心回答

movieDetail 初始是空对象，模板却直接读 pic.large，数据没回来或接口异常时，pic 可能不存在，页面就会报错或空白。

我会加 v-if 判断，或者初始化需要的结构，再补加载中、空数据、请求失败的提示和重试入口。现在按 ID 查详情已经做了，慢网和异常情况还没处理好。

## 回答要点

- movieDetail 初始是空对象，模板却直接读 pic.large，数据没回来或接口异常时，pic 可能不存在，页面就会报错或空白。
- 我会加 v-if 判断，或者初始化需要的结构，再补加载中、空数据、请求失败的提示和重试入口。

## 面试官可能追问

- 初始化完整空对象和条件渲染各有什么考虑？
- 正常空数据与请求失败应怎样区分？

## 代码证据

> **代码依据（不用于口述）**
>
> - [pages/detail/index.vue 第 1～10 行](</Users/aaron/CodingPractice/14_uniapp/project2/pages/detail/index.vue:1>)：模板直接读取嵌套的 `movieDetail.pic.large`。
> - [pages/detail/index.vue 第 18～37 行](</Users/aaron/CodingPractice/14_uniapp/project2/pages/detail/index.vue:18>)：初始值为空对象，请求过程没有 loading、catch 或错误状态。
