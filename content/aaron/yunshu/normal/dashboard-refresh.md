---
id: yunshu-normal-dashboard-refresh
title: 仪表盘管理和动态重查
aliases: [能讲讲项目中的仪表盘管理和动态重查吗？, 关于仪表盘管理和动态重查，能结合当前项目解释一下吗？]
category: yunshu
difficulty: 进阶
priority: normal
projects: [云枢智慧城市数据平台]
keywords: [仪表盘, 元数据, 配置回退]
---

# 仪表盘管理和动态重查

## 核心回答

仪表盘可以创建、编辑、克隆、删除和查看。打开看板后，先拿关联图表，再读每张图保存的转换规则，重新查数据、做统计和生成 option。某张图生成失败时，还能回退到保存的配置。

这样既能保留编辑结果，也能尝试展示新数据。多个图表用了 allSettled，一张失败不会阻止其他图处理。

【回退旧配置时提示还不明显，用户不一定知道数据是旧的。删除弹窗里的“级联删除”也只是前端文案，实际约束要由后端保证。】

## 回答要点

- 仪表盘可以创建、编辑、克隆、删除和查看。打开看板后，先拿关联图表，再读每张图保存的转换规则，重新查数据、做统计和生成 option。
- 这样既能保留编辑结果，也能尝试展示新数据。多个图表用了 allSettled，一张失败不会阻止其他图处理。
- 回退旧配置时提示还不明显，用户不一定知道数据是旧的。

## 面试官可能追问

- 重查失败显示旧配置时应该怎样提醒用户？
- 级联删除的真实性应在哪一端确认？

## 代码证据

> **代码依据（不用于口述）**
>
> - [Dashboards.tsx，第 125～147 行](/Users/aaron/personal-hub/apps/project-1/src/pages/Dashboards.tsx:125)：仪表盘列表加载和错误状态。
> - [Dashboards.tsx，第 149～225 行](/Users/aaron/personal-hub/apps/project-1/src/pages/Dashboards.tsx:149)：详情加载、城市字典、逐图查询、重新转换和部分失败隔离。
> - [Dashboards.tsx，第 241～327 行](/Users/aaron/personal-hub/apps/project-1/src/pages/Dashboards.tsx:241)：创建、编辑、克隆和删除操作。
> - [Dashboards.tsx，第 348～419 行](/Users/aaron/personal-hub/apps/project-1/src/pages/Dashboards.tsx:348)：实时图表配置和已保存配置的回退渲染。
> - [dashboards.ts，第 66～112 行](/Users/aaron/personal-hub/apps/project-1/src/api/dashboards.ts:66)：仪表盘列表、详情、增改删和克隆接口。
