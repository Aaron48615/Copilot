---
id: yingke-followup-vue-version
title: 追问：`main.js` 同时有 Vue 2 和 Vue 3 代码，项目到底用哪个？
aliases: [能讲讲项目中的Vue 2 与 Vue 3 条件编译的判断吗？, 关于Vue 2 与 Vue 3 条件编译的判断，能结合当前项目解释一下吗？]
category: yingke
difficulty: 基础
priority: normal
projects: [映刻影视]
keywords: [追问, 条件编译, vueVersion, main.js]
---

# 追问：`main.js` 同时有 Vue 2 和 Vue 3 代码，项目到底用哪个？

## 核心回答

按配置是 Vue 2。main.js 里的两套代码由 uni-app 条件编译分开，manifest.json 的 vueVersion 配了 2，所以走创建 Vue 实例再挂载的分支，不会两个版本一起跑。

【Vue 3 的 createSSRApp 是模板保留内容。这次没有构建，结论来自当前配置和源码。】

## 回答要点

- 按配置是 Vue 2。main.js 里的两套代码由 uni-app 条件编译分开，manifest.json 的 vueVersion 配了 2，所以走创建 Vue 实例再挂载的分支，不会两个版本一起跑。
- Vue 3 的 createSSRApp 是模板保留内容。

## 面试官可能追问

- 为什么 main.js 有 Vue 3 分支不代表实际运行 Vue 3？
- 配置结论还需要哪些构建结果来验证？

## 代码证据

> **代码依据（不用于口述）**
>
> - [main.js 第 3～21 行](</Users/aaron/CodingPractice/14_uniapp/project2/main.js:3>)：使用条件编译分别保留 Vue 2、Vue 3 启动分支。
> - [manifest.json 第 68～71 行](</Users/aaron/CodingPractice/14_uniapp/project2/manifest.json:68>)：配置 `vueVersion` 为 2。
