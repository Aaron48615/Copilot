---
id: yunshu-followup-city-limit
title: 追问：地图为什么只查 10 个城市？这是并发限制吗？缺失数据怎么影响统计？
aliases: [能讲讲项目中的地图前十个城市与并发限制的区别吗？, 关于地图前十个城市与并发限制的区别，能结合当前项目解释一下吗？]
category: yunshu
difficulty: 基础
priority: normal
projects: [云枢智慧城市数据平台]
keywords: [追问, slice, 请求数量, AQI]
---

# 追问：地图为什么只查 10 个城市？这是并发限制吗？缺失数据怎么影响统计？

## 核心回答

现在是过滤无效坐标后，直接 slice 前 10 个城市去查环境数据，限制的是总请求数量。后面的城市没有继续查，所以不是“每批最多并发十个”。

统计只算成功返回且 AQI 有效的记录，缺失或失败不按零算，也不能当成空气良好。

【页面会提示失败数量，但没有说明被截掉的城市范围。要覆盖全部城市，可以让后端提供批量最新环境接口，或者前端分页、分批请求，并说明统计了多少城市。】

## 回答要点

- 现在是过滤无效坐标后，直接 slice 前 10 个城市去查环境数据，限制的是总请求数量。
- 统计只算成功返回且 AQI 有效的记录，缺失或失败不按零算，也不能当成空气良好。
- 页面会提示失败数量，但没有说明被截掉的城市范围。

## 面试官可能追问

- 后面的城市不再查询为什么不能叫分批并发？
- 缺失城市会怎样影响页面统计的解释范围？

## 代码证据

> **代码依据（不用于口述）**
>
> - [Map.tsx，第 87～92 行](/Users/aaron/personal-hub/apps/project-1/src/pages/Map.tsx:87)：环境城市上限设置为 10。
> - [Map.tsx，第 247～275 行](/Users/aaron/personal-hub/apps/project-1/src/pages/Map.tsx:247)：过滤后的城市直接截取前十，并收集成功和失败结果。
> - [mapData.ts，第 83～103 行](/Users/aaron/personal-hub/apps/project-1/src/utils/mapData.ts:83)：选择时间最新且 AQI 有效的环境记录。
> - [mapData.ts，第 128～135 行](/Users/aaron/personal-hub/apps/project-1/src/utils/mapData.ts:128)：环境统计只基于传入的有效记录。
