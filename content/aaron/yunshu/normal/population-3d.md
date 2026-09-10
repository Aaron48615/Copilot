---
id: yunshu-normal-population-3d
title: 3D 城市人口视图
aliases: [能讲讲项目中的3D 城市人口视图的实现吗？, 关于3D 城市人口视图的实现，能结合当前项目解释一下吗？]
category: yunshu
difficulty: 基础
priority: normal
projects: [云枢智慧城市数据平台]
keywords: [Three.js, 人口, WebGL]
---

# 3D 城市人口视图

## 核心回答

3D 页面用立体柱子表示城市人口，用户可以拖动、缩放进行比较。拿到数据后，先过滤无效人口，再排序，最多取 20 个城市，按最大人口换算柱高，加上逐渐升高的动画、相机控制、光照和背景。

用了 Three.js 的 React 渲染层，方便用组件组织场景和动画生命周期。

【柱高表达相对人口，不是真实地理高度，位置、颜色和动画也只是展示安排，不能据此解释城市间的空间因果关系。页面依赖 WebGL，设备不支持或图形性能弱时，可能显示不正常。】

## 回答要点

- 3D 页面用立体柱子表示城市人口，用户可以拖动、缩放进行比较。
- 用了 Three.js 的 React 渲染层，方便用组件组织场景和动画生命周期。
- 柱高表达相对人口，不是真实地理高度，位置、颜色和动画也只是展示安排，不能据此解释城市间的空间因果关系。

## 面试官可能追问

- 柱子高度为什么不能当成真实地理高度？
- 设备不支持 WebGL 时可以怎样提供替代展示？

## 代码证据

> **代码依据（不用于口述）**
>
> - [Scene.tsx，第 72～113 行](/Users/aaron/personal-hub/apps/project-1/src/pages/Scene.tsx:72)：20 城上限、城市数据规范化、排序和 WebGL 能力检查。
> - [Scene.tsx，第 131～178 行](/Users/aaron/personal-hub/apps/project-1/src/pages/Scene.tsx:131)：人口柱体高度及增长动画。
> - [Scene.tsx，第 219～275 行](/Users/aaron/personal-hub/apps/project-1/src/pages/Scene.tsx:219)：3D 背景、相机控制和场景组成。
> - [Scene.tsx，第 282～356 行](/Users/aaron/personal-hub/apps/project-1/src/pages/Scene.tsx:282)：异步请求保护、人口最大值和场景数据计算。
> - [Scene.tsx，第 358～452 行](/Users/aaron/personal-hub/apps/project-1/src/pages/Scene.tsx:358)：加载、错误、空状态和 Canvas 渲染入口。
