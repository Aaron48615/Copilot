---
id: yingke-followup-request-unload
title: 追问：如果页面离开时请求还没有结束，怎么处理？
aliases: [能讲讲项目中的页面离开后的未完成请求吗？, 关于页面离开后的未完成请求，能结合当前项目解释一下吗？]
category: yingke
difficulty: 基础
priority: normal
projects: [映刻影视]
keywords: [追问, RequestTask, 取消请求, 卸载]
---

# 追问：如果页面离开时请求还没有结束，怎么处理？

## 核心回答

现在没有保存 uni.request 返回的 task，也没有取消逻辑，离开页面后请求仍可能返回并更新状态。

我会让 adapter 支持取消信号，在页面卸载时中止不需要的请求；至少也要判断页面是否还有效，再决定是否更新。

【慢网或频繁切页面时更容易遇到，这些目前是改进方案，还没实现。】

## 回答要点

- 现在没有保存 uni.request 返回的 task，也没有取消逻辑，离开页面后请求仍可能返回并更新状态。
- 我会让 adapter 支持取消信号，在页面卸载时中止不需要的请求；至少也要判断页面是否还有效，再决定是否更新。
- 慢网或频繁切页面时更容易遇到，这些目前是改进方案，还没实现。

## 面试官可能追问

- 不能真正取消请求时怎样防止旧结果更新页面？
- adapter 应怎样把页面取消信号传给请求任务？

## 代码证据

> **代码依据（不用于口述）**
>
> - [utils/request.js 第 4～25 行](</Users/aaron/CodingPractice/14_uniapp/project2/utils/request.js:4>)：调用 `uni.request` 后没有保存 request task，也没有取消逻辑。
> - [pages/detail/index.vue 第 25～31 行](</Users/aaron/CodingPractice/14_uniapp/project2/pages/detail/index.vue:25>)：详情请求返回后直接更新页面状态。
