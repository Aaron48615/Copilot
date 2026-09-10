---
id: yingke-followup-promisify-adapter
title: 追问：`uni.promisify.adaptor.js` 和 Axios adapter 是一回事吗？
aliases: [能讲讲项目中的uni Promise 适配与 Axios adapter 的区别吗？, 关于uni Promise 适配与 Axios adapter 的区别，能结合当前项目解释一下吗？]
category: yingke
difficulty: 进阶
priority: normal
projects: [映刻影视]
keywords: [追问, Promise, adapter, 回调]
---

# 追问：`uni.promisify.adaptor.js` 和 Axios adapter 是一回事吗？

## 核心回答

不是一回事。uni.promisify.adaptor.js 是整理 uni-app 的 Promise 返回值，把错误、结果组合的形式转成 resolve 或 reject。Axios adapter 则负责把 Axios 配置转成 uni.request 调用。

【现在 Axios adapter 用 success、fail 回调完成请求，本身并不依赖那个 promisify 文件。】

## 回答要点

- 不是一回事。uni.promisify.adaptor.js 是整理 uni-app 的 Promise 返回值，把错误、结果组合的形式转成 resolve 或 reject。
- 现在 Axios adapter 用 success、fail 回调完成请求，本身并不依赖那个 promisify 文件。

## 面试官可能追问

- 当前 Axios adapter 是否依赖 promisify 文件？
- 两种适配分别转换了哪一层输入或输出？

## 代码证据

> **代码依据（不用于口述）**
>
> - [uni.promisify.adaptor.js 第 1～13 行](</Users/aaron/CodingPractice/14_uniapp/project2/uni.promisify.adaptor.js:1>)：统一转换 uni-app Promise 返回值。
> - [main.js 第 3～11 行](</Users/aaron/CodingPractice/14_uniapp/project2/main.js:3>)：Vue 2 启动时全局导入 promisify 适配文件。
> - [utils/request.js 第 4～25 行](</Users/aaron/CodingPractice/14_uniapp/project2/utils/request.js:4>)：Axios adapter 使用 `uni.request` 回调。
