---
id: yunshu-normal-chart-semantics
title: 亮点二：图表配置同时保存展示结果和转换语义
aliases: [能讲讲项目中的图表展示配置和转换语义的保存吗？, 关于图表展示配置和转换语义的保存，能结合当前项目解释一下吗？]
category: yunshu
difficulty: 深入
priority: high
projects: [云枢智慧城市数据平台]
keywords: [亮点, ECharts option, 元数据, 版本]
---

# 亮点二：图表配置同时保存展示结果和转换语义

## 核心回答

只存 ECharts option，下次只能看到之前那批数据，不知道原来查哪张表、哪个字段、怎么统计；只存查询字段，又不够恢复展示配置。所以表名、X/Y 字段、实际查询字段、聚合方式、业务标签和时间粒度会一起存成带版本号的元数据。

编辑时读回配置，打开看板时按规则重新查数据、生成 option，失败再用旧配置显示。

【目前只支持版本 1 和固定几种转换，版本迁移、排序、复杂过滤还没覆盖，统计也在浏览器里做。验证时会保存后重开，再改底层数据检查统计结果和失败回退。】

## 回答要点

- 只存 ECharts option，下次只能看到之前那批数据，不知道原来查哪张表、哪个字段、怎么统计；只存查询字段，又不够恢复展示配置。
- 编辑时读回配置，打开看板时按规则重新查数据、生成 option，失败再用旧配置显示。
- 目前只支持版本 1 和固定几种转换，版本迁移、排序、复杂过滤还没覆盖，统计也在浏览器里做。

## 面试官可能追问

- 元数据版本变化后旧配置应该怎样兼容？
- 查询失败回退旧 option 时怎样避免用户误读数据？

## 代码证据

> **代码依据（不用于口述）**
>
> - [chartDataTransform.ts，第 43～74 行](/Users/aaron/personal-hub/apps/project-1/src/utils/chartDataTransform.ts:43)：转换元数据的版本检查、持久化和清理。
> - [ChartEditor.tsx，第 198～211 行](/Users/aaron/personal-hub/apps/project-1/src/pages/ChartEditor.tsx:198)：编辑时恢复查询和转换配置。
> - [ChartEditor.tsx，第 266～327 行](/Users/aaron/personal-hub/apps/project-1/src/pages/ChartEditor.tsx:266)：生成转换配置并随图表保存。
> - [Dashboards.tsx，第 165～217 行](/Users/aaron/personal-hub/apps/project-1/src/pages/Dashboards.tsx:165)：看板读取元数据、重新查询并生成实时图表配置。
> - [chartDataTransform.test.ts，第 158～192 行](/Users/aaron/personal-hub/apps/project-1/tests/chartDataTransform.test.ts:158)：代码中已有的元数据读写及“先聚合后限制”相关测试。
