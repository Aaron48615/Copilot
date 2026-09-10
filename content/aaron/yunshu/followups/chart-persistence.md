---
id: yunshu-followup-chart-persistence
title: 追问：为什么既保存查询配置又保存 ECharts option？保存后刷新，结果一定相同吗？
aliases: [能讲讲项目中的查询配置与 ECharts option 同时保存的原因吗？, 关于查询配置与 ECharts option 同时保存的原因，能结合当前项目解释一下吗？]
category: yunshu
difficulty: 进阶
priority: normal
projects: [云枢智慧城市数据平台]
keywords: [追问, 查询配置, option, 元数据]
---

# 追问：为什么既保存查询配置又保存 ECharts option？保存后刷新，结果一定相同吗？

## 核心回答

查询配置记的是表和字段，option 记的是展示方式和预览时的数据。还会把聚合方式、业务标签、实际查询字段和版本放进元数据，编辑时回填，打开仪表盘时重新查询生成。

只存 option 不知道怎么重新统计，只存字段又不够恢复展示。重新打开的结果也不一定一样，底层数据可能变，查询失败还可能显示旧 option。

【图表列表预览走另一条查询路径，后面应该统一转换规则，并标出数据时间和回退状态。】

## 回答要点

- 查询配置记的是表和字段，option 记的是展示方式和预览时的数据。
- 只存 option 不知道怎么重新统计，只存字段又不够恢复展示。
- 图表列表预览走另一条查询路径，后面应该统一转换规则，并标出数据时间和回退状态。

## 面试官可能追问

- 底层数据变化后重新打开为什么可能显示不同结果？
- 重查失败回退旧数据应该提示哪些时间或状态信息？

## 代码证据

> **代码依据（不用于口述）**
>
> - [ChartEditor.tsx，第 314～327 行](/Users/aaron/personal-hub/apps/project-1/src/pages/ChartEditor.tsx:314)：同时保存查询配置、图表配置和转换元数据。
> - [chartDataTransform.ts，第 43～74 行](/Users/aaron/personal-hub/apps/project-1/src/utils/chartDataTransform.ts:43)：转换元数据的写入、读取和剥离。
> - [Dashboards.tsx，第 181～217 行](/Users/aaron/personal-hub/apps/project-1/src/pages/Dashboards.tsx:181)：按元数据重新查询并生成实时 option。
> - [Dashboards.tsx，第 399～411 行](/Users/aaron/personal-hub/apps/project-1/src/pages/Dashboards.tsx:399)：实时 option 不可用时回退到已保存配置。
> - [Chart.tsx，第 133～145 行](/Users/aaron/personal-hub/apps/project-1/src/pages/Chart.tsx:133)：图表列表预览使用图表查询接口。
