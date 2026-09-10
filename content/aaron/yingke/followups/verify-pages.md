---
id: yingke-followup-verify-pages
title: 追问：怎样验证分页没有重复或遗漏？
aliases: [能讲讲项目中的分页重复和遗漏的验证方法吗？, 关于分页重复和遗漏的验证方法，能结合当前项目解释一下吗？]
category: yingke
difficulty: 基础
priority: normal
projects: [映刻影视]
keywords: [追问, start, 影片 ID, 失败重试]
---

# 追问：怎样验证分页没有重复或遗漏？

## 核心回答

先看 start 是否按 0、8、16 增加，再记录每页影片 ID，检查追加后有没有重复。然后试连续触底、最后一页不足 8 条、空数组、失败重试和详情返回，检查列表数量与 total 是否对应。

【现在没有请求锁和去重，尤其要确认返回时重复初始化的问题，还不能说这些已经测试通过。】

## 回答要点

- 先看 start 是否按 0、8、16 增加，再记录每页影片 ID，检查追加后有没有重复。
- 现在没有请求锁和去重，尤其要确认返回时重复初始化的问题，还不能说这些已经测试通过。

## 面试官可能追问

- 失败重试后怎样核对没有跳过一页？
- 详情返回时应检查哪些初始化和请求记录？

## 代码证据

> **代码依据（不用于口述）**
>
> - [pages/list/index.vue 第 64～74 行](</Users/aaron/CodingPractice/14_uniapp/project2/pages/list/index.vue:64>)：分页结果追加和总数保存位置。
> - [pages/list/index.vue 第 81～102 行](</Users/aaron/CodingPractice/14_uniapp/project2/pages/list/index.vue:81>)：生命周期初始化和触底分页入口。
