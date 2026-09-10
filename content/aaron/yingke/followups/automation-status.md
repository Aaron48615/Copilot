---
id: yingke-followup-automation-status
title: 追问：【高频】这个项目有自动化测试吗？
aliases: [能讲讲项目中的自动化测试的实际状态吗？, 关于自动化测试的实际状态，能结合当前项目解释一下吗？]
category: yingke
difficulty: 基础
priority: high
projects: [映刻影视]
keywords: [追问, 测试占位, 单元测试, 业务验证]
---

# 追问：【高频】这个项目有自动化测试吗？

## 核心回答

目前没有，package.json 的 test 还是默认报错占位，也没有项目级测试目录或通过记录。我会先补请求 adapter、简介截断和分页状态的单测，再在小程序里验证首页到列表、详情的完整流程。

【手动打开页面没报错，只能说明当时那种操作没出问题，不能代替完整验证。】

## 回答要点

- 目前没有，package.json 的 test 还是默认报错占位，也没有项目级测试目录或通过记录。
- 手动打开页面没报错，只能说明当时那种操作没出问题，不能代替完整验证。

## 面试官可能追问

- 默认报错的 test 脚本能否算自动化测试？
- 请求适配与整页业务流程应分别怎样测试？

## 代码证据

> **代码依据（不用于口述）**
>
> - [package.json 第 9～10 行](</Users/aaron/CodingPractice/14_uniapp/project2/package.json:9>)：`test` 命令是默认失败占位。
