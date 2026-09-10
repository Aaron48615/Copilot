---
id: yunshu-normal-chart-editor
title: 图表创建和编辑
aliases: [能讲讲项目中的图表创建和编辑的流程吗？, 关于图表创建和编辑的流程，能结合当前项目解释一下吗？]
category: yunshu
difficulty: 基础
priority: normal
projects: [云枢智慧城市数据平台]
keywords: [ECharts, 聚合, 转换元数据]
---

# 图表创建和编辑

## 核心回答

创建图表时，先选仪表盘、数据源和数据表，再选 X 轴、Y 轴、统计方式和图表类型。选表后查字段，生成预览时拿到行数据，把城市 ID 换成城市名、时间统一到天，再做计数、求和、平均、最大或最小值，最后生成 ECharts 配置。

保存时，查询字段、图表配置和转换规则一起保存，后面就能按原来的规则重新查询、生成，用户不用自己写 SQL 或 option。

【转换规则放在元数据里。目前聚合在浏览器做，数据大了不合适；最多显示前 50 个分类，但只是按插入顺序截取，没有指标排名，不能叫 Top 50。】

## 回答要点

- 创建图表时，先选仪表盘、数据源和数据表，再选 X 轴、Y 轴、统计方式和图表类型。
- 保存时，查询字段、图表配置和转换规则一起保存，后面就能按原来的规则重新查询、生成，用户不用自己写 SQL 或 option。
- 转换规则放在元数据里。目前聚合在浏览器做，数据大了不合适；最多显示前 50 个分类，但只是按插入顺序截取，没有指标排名，不能叫 Top 50。

## 面试官可能追问

- 为什么先聚合全部返回行再限制显示分类数？
- 保存查询字段为什么还不足以完整恢复图表？

## 代码证据

> **代码依据（不用于口述）**
>
> - [ChartEditor.tsx，第 53～109 行](/Users/aaron/personal-hub/apps/project-1/src/pages/ChartEditor.tsx:53)：内置数据表说明和字段辅助判断。
> - [ChartEditor.tsx，第 160～228 行](/Users/aaron/personal-hub/apps/project-1/src/pages/ChartEditor.tsx:160)：加载字段、仪表盘、数据源、编辑详情和城市字典。
> - [ChartEditor.tsx，第 230～304 行](/Users/aaron/personal-hub/apps/project-1/src/pages/ChartEditor.tsx:230)：切换表、查询数据、转换业务字段并生成预览。
> - [ChartEditor.tsx，第 306～335 行](/Users/aaron/personal-hub/apps/project-1/src/pages/ChartEditor.tsx:306)：保存查询配置、ECharts 配置和转换元数据。
> - [datasources.ts，第 34～49 行](/Users/aaron/personal-hub/apps/project-1/src/api/datasources.ts:34)：数据源列表、数据表、字段和查询接口。
> - [chartDataTransform.ts，第 43～74 行](/Users/aaron/personal-hub/apps/project-1/src/utils/chartDataTransform.ts:43)：转换元数据的写入、读取和移除。
> - [chartDataTransform.ts，第 101～187 行](/Users/aaron/personal-hub/apps/project-1/src/utils/chartDataTransform.ts:101)：字段转换、聚合、无效值统计和 50 项限制。
