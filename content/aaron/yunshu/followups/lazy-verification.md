---
id: yunshu-followup-lazy-verification
title: 追问：你说做了懒加载，具体什么时候加载？怎么证明性能真的变好了？
aliases: [能讲讲项目中的懒加载时机与性能验证吗？, 关于懒加载时机与性能验证，能结合当前项目解释一下吗？]
category: yunshu
difficulty: 基础
priority: normal
projects: [云枢智慧城市数据平台]
keywords: [追问, React.lazy, Suspense, 延迟加载]
---

# 追问：你说做了懒加载，具体什么时候加载？怎么证明性能真的变好了？

## 核心回答

页面用 React.lazy，访问对应路由时才加载，Suspense 显示占位。图表还做了第二层延迟，满足可见和交互条件后才加载 ECharts 实现。

这些只能说明加载被推迟了，具体快多少需要测。我会在相同设备和网络下比较首屏资源、主线程耗时和图表首次可用时间。

【当前图表要求挂载后有过交互，或者初始化时页面已经滚动，用户停着不操作可能一直看占位，所以还要测无交互、慢网和低性能设备，不能只报性能收益。】

## 回答要点

- 页面用 React.lazy，访问对应路由时才加载，Suspense 显示占位。
- 这些只能说明加载被推迟了，具体快多少需要测。
- 当前图表要求挂载后有过交互，或者初始化时页面已经滚动，用户停着不操作可能一直看占位，所以还要测无交互、慢网和低性能设备，不能只报性能收益。

## 面试官可能追问

- 用户不交互时图表会不会一直停在占位？
- 比较懒加载收益需要固定哪些测试条件？

## 代码证据

> **代码依据（不用于口述）**
>
> - [router/index.tsx，第 6～27 行](/Users/aaron/personal-hub/apps/project-1/src/router/index.tsx:6)：路由页面使用 lazy 和 Suspense。
> - [ChartRender.tsx，第 18～53 行](/Users/aaron/personal-hub/apps/project-1/src/components/ChartRender.tsx:18)：图表加载依赖可见性及交互条件。
> - [ChartRender.tsx，第 73～84 行](/Users/aaron/personal-hub/apps/project-1/src/components/ChartRender.tsx:73)：条件满足后才渲染懒加载实现。
> - [Scene.tsx，第 408～425 行](/Users/aaron/personal-hub/apps/project-1/src/pages/Scene.tsx:408)：3D Canvas 的像素比和展示入口。
