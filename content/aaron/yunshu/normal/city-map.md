---
id: yunshu-normal-city-map
title: 城市地图与环境监测
aliases: [能讲讲项目中的城市地图和环境监测吗？, 关于城市地图和环境监测，能结合当前项目解释一下吗？]
category: yunshu
difficulty: 基础
priority: normal
projects: [云枢智慧城市数据平台]
keywords: [高德地图, AQI, allSettled]
---

# 城市地图与环境监测

## 核心回答

地图有城市标记和环境监测两种模式。拿到城市列表后，先转换数字、过滤无效数据，城市模式用 Marker 标出位置，点击显示人口、面积和 GDP。环境模式查前十个城市的最新记录，用 AQI 控制圆的颜色和大小，点击看 AQI、PM2.5 和天气。

环境请求用了 allSettled，成功的继续显示，失败的统计数量并提示。地图实例和覆盖物用 useRef 保存，切换模式时清理旧事件、覆盖物，卸载时也清理监听并销毁地图。

【城市数据会过滤缺 ID、名称和经纬度不合法的项。信息窗体、事件处理器和尺寸监听也需要清理，避免残留。环境模式目前只查前十个城市，AQI 分级和圆大小是前端展示规则，可用性也受高德 Key、配额和网络影响。】

## 回答要点

- 地图有城市标记和环境监测两种模式。拿到城市列表后，先转换数字、过滤无效数据，城市模式用 Marker 标出位置，点击显示人口、面积和 GDP。
- 环境请求用了 allSettled，成功的继续显示，失败的统计数量并提示。
- 城市数据会过滤缺 ID、名称和经纬度不合法的项。

## 面试官可能追问

- 缺失环境数据为什么不能当作 AQI 为零？
- 切换模式时哪些覆盖物与事件需要清理？

## 代码证据

> **代码依据（不用于口述）**
>
> - [Map.tsx，第 87～113 行](/Users/aaron/personal-hub/apps/project-1/src/pages/Map.tsx:87)：地图初始参数、环境城市上限和 SDK 单例加载。
> - [Map.tsx，第 185～234 行](/Users/aaron/personal-hub/apps/project-1/src/pages/Map.tsx:185)：地图实例引用、覆盖物清理和 SDK 异步加载保护。
> - [Map.tsx，第 236～293 行](/Users/aaron/personal-hub/apps/project-1/src/pages/Map.tsx:236)：城市请求、前十个环境请求、部分成功收集和卸载保护。
> - [Map.tsx，第 295～387 行](/Users/aaron/personal-hub/apps/project-1/src/pages/Map.tsx:295)：地图创建、尺寸监听、Marker/Circle 切换、事件解绑和实例销毁。
> - [Map.tsx，第 417～498 行](/Users/aaron/personal-hub/apps/project-1/src/pages/Map.tsx:417)：模式切换、统计卡片、部分失败提示和地图状态展示。
> - [mapData.ts，第 27～135 行](/Users/aaron/personal-hub/apps/project-1/src/utils/mapData.ts:27)：城市和环境数据规范化、最新记录选择、AQI 规则及统计计算。
