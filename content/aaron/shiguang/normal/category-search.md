---
id: shiguang-normal-category-search
title: 分类和搜索
aliases: [能讲讲项目中的分类搜索和搜索历史吗？, 关于分类搜索和搜索历史，能结合当前项目解释一下吗？]
category: shiguang
difficulty: 基础
priority: normal
projects: [拾光集移动商城系统]
keywords: [分类 ID, 防抖, 搜索历史]
---

# 分类和搜索

## 核心回答

分类页主要是根据当前分类 ID 查商品，从首页点某个分类进来，也会定位到对应的栏目。搜索这边我把联想和查商品分开了：输入后停够 500ms 才请求 AI 建议，按搜索键或者点热门词，才真正查商品。

搜索历史存在本地，只保留最近 10 条。存之前会去掉首尾空格和重复项，再把这次搜的词放到最前面。

【这样连续打字时不用每输入一个字都请求 AI。热门词接口失败有本地热门词，AI 联想失败也有规则兜底，用户还是可以正常搜索商品。】

## 回答要点

- 分类页主要是根据当前分类 ID 查商品，从首页点某个分类进来，也会定位到对应的栏目。
- 搜索历史存在本地，只保留最近 10 条。存之前会去掉首尾空格和重复项，再把这次搜的词放到最前面。
- 这样连续打字时不用每输入一个字都请求 AI。

## 面试官可能追问

- 普通搜索与 AI 联想为什么使用不同触发入口？
- 搜索历史损坏或账号切换时怎样处理？

## 代码证据

> **代码依据（不用于口述）**
> - [分类页第 135～191 行](/Users/aaron/personal-hub/apps/project-2/src/views/Category.vue:135)：分类切换、首页入口映射和商品请求。
> - [搜索页第 269～305 行](/Users/aaron/personal-hub/apps/project-2/src/views/Search.vue:269)：热门词、历史读取、搜索和历史去重保存。
> - [搜索页第 308～347 行](/Users/aaron/personal-hub/apps/project-2/src/views/Search.vue:308)：正式商品搜索和标签搜索入口。
> - [搜索页第 348～410 行](/Users/aaron/personal-hub/apps/project-2/src/views/Search.vue:348)：AI 联想、防抖触发和响应有效性判断。
> - [搜索页第 432～467 行](/Users/aaron/personal-hub/apps/project-2/src/views/Search.vue:432)：本地建议和可取消的 debounce。
