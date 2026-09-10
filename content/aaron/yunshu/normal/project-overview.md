---
id: yunshu-normal-project-overview
title: 项目介绍
aliases: [能讲讲项目中的云枢平台的项目介绍和模块吗？, 关于云枢平台的项目介绍和模块，能结合当前项目解释一下吗？]
category: yunshu
difficulty: 基础
priority: high
projects: [云枢智慧城市数据平台]
keywords: [React, 城市数据, 数据可视化]
---

# 项目介绍

## 核心回答

这个项目叫云枢智慧城市数据平台，主要面向城市运营和数据分析人员，把比较分散的城市数据放到一个平台里，方便统一查看。

用户用账号、密码和验证码登录后，首页能看城市总数、人口、GDP、交通拥堵、公共设施和城市事件。地图可以看城市位置和环境数据，3D 页面可以比较城市人口。需要专题分析时，可以选数据源、数据表、横纵轴和统计方式，生成柱状图、折线图或饼图，再组合成自己的仪表盘。另外还有 AI 助手，可以用文字查询城市、交通、天气、设施和事件，管理员也能管理用户、角色和权限。

技术上主要用了 React 19、TypeScript、Vite、React Router、Redux Toolkit、Axios 和 ECharts，3D 用 Three.js 相关库，地图接的是高德 API。我印象比较深的是登录鉴权、Token 无感刷新、角色权限，还有地图、图表编辑和 AI 流式回答。

【登录和主题状态通过 redux-persist 保存。多个请求刷新 Token 时会共享一次刷新，地图允许部分环境接口失败，图表也会保存统计规则，打开仪表盘时重新查数据。这些能在代码里找到，具体线上性能和用户效果没有实测数据，不能直接报提升了多少。】

## 回答要点

- 这个项目叫云枢智慧城市数据平台，主要面向城市运营和数据分析人员，把比较分散的城市数据放到一个平台里，方便统一查看。
- 用户用账号、密码和验证码登录后，首页能看城市总数、人口、GDP、交通拥堵、公共设施和城市事件。
- 技术上主要用了 React 19、TypeScript、Vite、React Router、Redux Toolkit、Axios 和 ECharts，3D 用 Three.js 相关库，地图接的是高德 API。

## 面试官可能追问

- 图表和仪表盘分别解决什么需求？
- 哪些项目效果目前没有实际测量依据？

## 代码证据

> **代码依据（不用于口述）**
>
> - [package.json，第 6～44 行](/Users/aaron/personal-hub/apps/project-1/package.json:6)：项目脚本以及 React、Redux、Axios、ECharts、Three.js、高德地图等依赖。
> - [router/index.tsx，第 6～21 行](/Users/aaron/personal-hub/apps/project-1/src/router/index.tsx:6)：各业务页面采用懒加载接入路由。
> - [router/index.tsx，第 30～182 行](/Users/aaron/personal-hub/apps/project-1/src/router/index.tsx:30)：首页、仪表盘、图表、地图、3D、AI、用户、角色和个人中心的路由入口。
> - [Layout.tsx，第 25～99 行](/Users/aaron/personal-hub/apps/project-1/src/layout/Layout.tsx:25)：平台菜单和模块分组。
> - [main.tsx，第 14～39 行](/Users/aaron/personal-hub/apps/project-1/src/main.tsx:14)：全局主题、会话管理、路由、Redux 和持久化的应用入口。
