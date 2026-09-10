---
id: yunshu-normal-verify-layout
title: 移动端和容器布局
aliases: [能讲讲项目中的移动端与容器布局的验证吗？, 关于移动端与容器布局的验证，能结合当前项目解释一下吗？]
category: yunshu
difficulty: 基础
priority: normal
projects: [云枢智慧城市数据平台]
keywords: [响应式, ResizeObserver, 地图]
---

# 移动端和容器布局

## 核心回答

我会看 375px、768px 和桌面宽度，检查侧栏、表格横向滚动、卡片换行、地图高度和工具栏，还有 AI 输入区和弹窗。再试横竖屏、长城市名、长回答和系统字体放大。

【地图用 ResizeObserver 调 map.resize，尺寸变了还要检查中心和覆盖物。代码已有响应式列和媒体查询，但这次没开浏览器实测，不能说移动端已验证通过。】

## 回答要点

- 我会看 375px、768px 和桌面宽度，检查侧栏、表格横向滚动、卡片换行、地图高度和工具栏，还有 AI 输入区和弹窗。
- 地图用 ResizeObserver 调 map.resize，尺寸变了还要检查中心和覆盖物。

## 面试官可能追问

- 侧栏折叠后地图和图表是否都会自动调整尺寸？
- 长城市名和系统字体放大时需要检查什么？

## 代码证据

> **代码依据（不用于口述）**
>
> - [Dashboard.tsx，第 576～602 行](/Users/aaron/personal-hub/apps/project-1/src/pages/Dashboard.tsx:576)：首页指标卡使用 xs、sm、md、lg、xl 响应式列。
> - [Map.tsx，第 295～310 行](/Users/aaron/personal-hub/apps/project-1/src/pages/Map.tsx:295)：地图容器尺寸变化时调用 resize。
> - [Map.css，第 160～179 行](/Users/aaron/personal-hub/apps/project-1/src/css/Map.css:160)：768 像素以下的地图工具栏和高度规则。
