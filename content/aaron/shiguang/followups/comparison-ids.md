---
id: shiguang-followup-comparison-ids
title: 追问：用户怎么使用对比功能？为什么只保存商品和规格 ID？
aliases: [能讲讲项目中的商品对比流程和只持久化 ID 的原因吗？, 关于商品对比流程和只持久化 ID 的原因，能结合当前项目解释一下吗？]
category: shiguang
difficulty: 基础
priority: normal
projects: [拾光集移动商城系统]
keywords: [追问, Pinia, SKU ID, 持久化]
---

# 追问：用户怎么使用对比功能？为什么只保存商品和规格 ID？

## 核心回答

用户在首页、分类、搜索或者详情里，都可以把商品加入对比，目前最多选两件不同的商品。底部有一个可以收起的对比栏，可以移除、清空，再进入对比页。对比页里选好规格，先看差异，也可以填预算和需求，让 AI 分析。决定以后点“去选购”，会带着选中的 skuId 回详情页，由用户继续加购或者购买。

这些入口分布在不同页面，所以我用 Pinia 共用选择状态，再把商品 ID 和 SKU ID 存到 localStorage。没有把整个商品对象一起保存，是因为价格、库存都可能变化，刷新以后应该重新请求商品，再检查原来的规格是否还能用。保留的是用户选了什么，商品信息还是重新拿。

【恢复时会过滤无效 ID、重复商品，也限制最多两件。localStorage 读写失败不会挡住当前页面的操作，只是不能保证刷新后保留。回详情页时也不会直接相信路由里的 skuId，会在当前商品的 SKU 列表里确认它有库存，才用来预选。】

## 回答要点

- 用户在首页、分类、搜索或者详情里，都可以把商品加入对比，目前最多选两件不同的商品。
- 这些入口分布在不同页面，所以我用 Pinia 共用选择状态，再把商品 ID 和 SKU ID 存到 localStorage。
- 恢复时会过滤无效 ID、重复商品，也限制最多两件。

## 面试官可能追问

- 恢复时所选 SKU 已缺货应该怎样处理？
- localStorage 写入失败是否应该阻止本次对比？

## 代码证据

代码依据：[跨页面选择与持久化](/Users/aaron/personal-hub/apps/project-2/src/stores/compare.ts:9)、[恢复数据校验](/Users/aaron/personal-hub/apps/project-2/src/compare/model.ts:26)、[详情预选](/Users/aaron/personal-hub/apps/project-2/src/views/ProdInfo.vue:346)。
