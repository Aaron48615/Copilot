---
id: yingke-followup-adapter-choice
title: 追问：【高频】为什么自己实现 adapter？项目里不是还安装了 `axios-miniprogram` 吗？
aliases: [能讲讲项目中的自写 adapter 与 axios-miniprogram 的取舍吗？, 关于自写 adapter 与 axios-miniprogram 的取舍，能结合当前项目解释一下吗？]
category: yingke
difficulty: 进阶
priority: high
projects: [映刻影视]
keywords: [追问, adapter, axios-miniprogram, 依赖维护]
---

# 追问：【高频】为什么自己实现 adapter？项目里不是还安装了 `axios-miniprogram` 吗？

## 核心回答

实际用的是自己写的 adapter，axios-miniprogram 虽然装了，但业务代码没有导入。自己写能直接控制参数转换和响应格式，不过成熟适配库一般考虑得更全面。

【继续维护时，我会选一种方案，要么补完整自己的实现，要么换合适的库，再删掉没用的依赖，减少包体和理解成本。】

## 回答要点

- 实际用的是自己写的 adapter，axios-miniprogram 虽然装了，但业务代码没有导入。
- 继续维护时，我会选一种方案，要么补完整自己的实现，要么换合适的库，再删掉没用的依赖，减少包体和理解成本。

## 面试官可能追问

- 怎样确认安装的适配库是否实际被使用？
- 选择成熟适配库前需要核对哪些支持能力？

## 代码证据

> **代码依据（不用于口述）**
>
> - [package.json 第 12～16 行](</Users/aaron/CodingPractice/14_uniapp/project2/package.json:12>)：依赖中同时声明 Axios 和 axios-miniprogram。
> - [utils/request.js 第 1～6 行](</Users/aaron/CodingPractice/14_uniapp/project2/utils/request.js:1>)：业务代码实际导入 Axios，并自行定义 adapter。
