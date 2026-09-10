---
id: yunshu-normal-module-overview
title: 用一句话记住各模块
aliases: [能讲讲项目中的云枢各业务模块的职责吗？, 关于云枢各业务模块的职责，能结合当前项目解释一下吗？]
category: yunshu
difficulty: 进阶
priority: normal
projects: [云枢智慧城市数据平台]
keywords: [地图, 图表, 仪表盘]
---

# 用一句话记住各模块

## 核心回答

首页看城市整体情况，地图看位置和 AQI，3D 看人口对比。图表管理负责把数据生成图表，仪表盘管理再把多张图组合成专题看板。AI 可以直接用文字提问，用户、角色和个人中心负责账号和权限。

【整个流程可以记成先登录看总览，再到地图、3D 或 AI 看具体信息，需要分析时创建图表和仪表盘，管理员通过管理页面维护用户和权限。】

## 回答要点

- 首页看城市整体情况，地图看位置和 AQI，3D 看人口对比。
- 整个流程可以记成先登录看总览，再到地图、3D 或 AI 看具体信息，需要分析时创建图表和仪表盘，管理员通过管理页面维护用户和权限。

## 面试官可能追问

- 用户从总览到专题看板会经过哪些模块？
- 用户角色管理与普通数据浏览的权限怎样区分？

## 代码证据

> **代码依据（不用于口述）**
>
> - [Layout.tsx，第 25～99 行](/Users/aaron/personal-hub/apps/project-1/src/layout/Layout.tsx:25)：菜单中列出的业务模块及适用角色。
> - [Dashboard.tsx，第 556～655 行](/Users/aaron/personal-hub/apps/project-1/src/pages/Dashboard.tsx:556)：首页指标、图表和事件列表的页面结构。
> - [Map.tsx，第 417～498 行](/Users/aaron/personal-hub/apps/project-1/src/pages/Map.tsx:417)：地图模式、统计卡片、部分失败提示和地图容器。
> - [AI.tsx，第 218～383 行](/Users/aaron/personal-hub/apps/project-1/src/pages/AI.tsx:218)：AI 对话区、输入区和模型配置入口。
