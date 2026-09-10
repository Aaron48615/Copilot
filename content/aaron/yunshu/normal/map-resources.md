---
id: yunshu-normal-map-resources
title: 亮点三：地图数据部分失败和命令式资源生命周期管理
aliases: [能讲讲项目中的地图部分失败与资源生命周期管理吗？, 关于地图部分失败与资源生命周期管理，能结合当前项目解释一下吗？]
category: yunshu
difficulty: 进阶
priority: high
projects: [云枢智慧城市数据平台]
keywords: [亮点, allSettled, 覆盖物, ResizeObserver]
---

# 亮点三：地图数据部分失败和命令式资源生命周期管理

## 核心回答

环境地图要分别请求多个城市，我用了 allSettled，把成功数据和失败数量分开收集，成功的继续画，失败的提示数量。这样不会因为一个城市失败，就拿不到其他城市的结果。

地图实例和事件也要自己清理，所以覆盖物、点击事件、信息窗体和 ResizeObserver 都有创建、销毁处理。

【Promise.all 一项拒绝就会进入整组 catch。目前还没有单城市重试，也没细分超时、空数据和业务错误，覆盖物多了还需要聚合或虚拟化。验证时会模拟部分失败，并反复切模式、离开页面，检查事件和覆盖物有没有累积。】

## 回答要点

- 环境地图要分别请求多个城市，我用了 allSettled，把成功数据和失败数量分开收集，成功的继续画，失败的提示数量。
- 地图实例和事件也要自己清理，所以覆盖物、点击事件、信息窗体和 ResizeObserver 都有创建、销毁处理。
- Promise.all 一项拒绝就会进入整组 catch。

## 面试官可能追问

- 反复切模式时怎样判断事件是否累积？
- 只统计失败数量还缺少哪些失败信息？

## 代码证据

> **代码依据（不用于口述）**
>
> - [Map.tsx，第 185～212 行](/Users/aaron/personal-hub/apps/project-1/src/pages/Map.tsx:185)：地图对象引用和覆盖物事件清理函数。
> - [Map.tsx，第 236～293 行](/Users/aaron/personal-hub/apps/project-1/src/pages/Map.tsx:236)：多城市环境请求的部分成功处理。
> - [Map.tsx，第 295～322 行](/Users/aaron/personal-hub/apps/project-1/src/pages/Map.tsx:295)：地图、信息窗体和 ResizeObserver 的创建及销毁。
> - [Map.tsx，第 324～387 行](/Users/aaron/personal-hub/apps/project-1/src/pages/Map.tsx:324)：模式变化时重建覆盖物并解绑事件。
> - [Map.tsx，第 467～474 行](/Users/aaron/personal-hub/apps/project-1/src/pages/Map.tsx:467)：部分城市失败的用户提示。
