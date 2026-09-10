---
id: yunshu-followup-ref-cleanup
title: 追问：地图和 ECharts 实例为什么用 useRef，不放 useState？切换页面如何清理？
aliases: [能讲讲项目中的地图和 ECharts 实例的保存与清理吗？, 关于地图和 ECharts 实例的保存与清理，能结合当前项目解释一下吗？]
category: yunshu
difficulty: 基础
priority: normal
projects: [云枢智慧城市数据平台]
keywords: [追问, useRef, dispose, ResizeObserver]
---

# 追问：地图和 ECharts 实例为什么用 useRef，不放 useState？切换页面如何清理？

## 核心回答

地图和 ECharts 实例要跨渲染保留，但实例变化本身不需要让 React 重渲染，所以放 useRef；加载、模式和业务数据才放 state。

地图切模式先清事件和覆盖物，卸载时断开 ResizeObserver、关闭窗体并销毁；ECharts 卸载时移除 resize 监听，再 dispose。

【ref 更新不触发渲染，所以地图创建后用了 mapGeneration 通知覆盖物逻辑。图表目前只听窗口 resize，侧栏折叠这种容器变化可能漏掉，后面可以像地图一样观察实际容器。】

## 回答要点

- 地图和 ECharts 实例要跨渲染保留，但实例变化本身不需要让 React 重渲染，所以放 useRef；加载、模式和业务数据才放 state。
- 地图切模式先清事件和覆盖物，卸载时断开 ResizeObserver、关闭窗体并销毁；ECharts 卸载时移除 resize 监听，再 dispose。
- ref 更新不触发渲染，所以地图创建后用了 mapGeneration 通知覆盖物逻辑。

## 面试官可能追问

- ref 更新不触发渲染时覆盖物逻辑怎样得知地图就绪？
- 窗口没变但侧栏折叠时 resize 监听够不够？

## 代码证据

> **代码依据（不用于口述）**
>
> - [Map.tsx，第 185～212 行](/Users/aaron/personal-hub/apps/project-1/src/pages/Map.tsx:185)：地图实例、覆盖物和监听器使用 ref 保存并统一清理。
> - [Map.tsx，第 295～330 行](/Users/aaron/personal-hub/apps/project-1/src/pages/Map.tsx:295)：创建地图、更新 generation、监听容器和卸载销毁。
> - [ChartRenderImpl.tsx，第 13～38 行](/Users/aaron/personal-hub/apps/project-1/src/components/ChartRenderImpl.tsx:13)：ECharts 初始化、窗口 resize 监听和 dispose。
