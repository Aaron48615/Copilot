---
id: yunshu-normal-data-scale-gap
title: 不足六：首页失败隔离和图表大数据处理有限
aliases: [能讲讲项目中的首页失败隔离和大数据聚合的局限吗？, 关于首页失败隔离和大数据聚合的局限，能结合当前项目解释一下吗？]
category: yunshu
difficulty: 基础
priority: normal
projects: [云枢智慧城市数据平台]
keywords: [不足, Promise.all, 前端聚合, Top N]
---

# 不足六：首页失败隔离和图表大数据处理有限

## 核心回答

首页一个概览接口失败会影响整组刷新，图表又在浏览器聚合全部行，再截前 50 项，数据多了会增加计算和内存开销。

我会让首页每张卡片单独维护 loading、error、data，用 allSettled 展示成功部分。图表大数据的聚合、排序、过滤和数量限制交给后端或数据库，返回明确的 Top N。

【现在 50 项没有按业务指标排序，不能叫 Top 50，也不能说已经完成大数据优化。】

## 回答要点

- 首页一个概览接口失败会影响整组刷新，图表又在浏览器聚合全部行，再截前 50 项，数据多了会增加计算和内存开销。
- 我会让首页每张卡片单独维护 loading、error、data，用 allSettled 展示成功部分。
- 现在 50 项没有按业务指标排序，不能叫 Top 50，也不能说已经完成大数据优化。

## 面试官可能追问

- 前 50 个分类与 Top 50 有什么区别？
- 把聚合移到后端后前端仍需要传哪些规则？

## 代码证据

> **代码依据（不用于口述）**
>
> - [Dashboard.tsx，第 486～500 行](/Users/aaron/personal-hub/apps/project-1/src/pages/Dashboard.tsx:486)：四个首页接口作为一个 Promise.all 批次。
> - [chartDataTransform.ts，第 101～174 行](/Users/aaron/personal-hub/apps/project-1/src/utils/chartDataTransform.ts:101)：浏览器遍历、聚合并按插入顺序截取 50 项。
> - [ChartEditor.tsx，第 258～297 行](/Users/aaron/personal-hub/apps/project-1/src/pages/ChartEditor.tsx:258)：查询整批行数据后在前端转换并生成 option。
