---
id: lidi-202609-city-tech-stack
title: 你这个项目为什么用 React 和 TypeScript？
aliases: [城市视图为什么选 React, 为什么用 TypeScript, 这个项目的技术栈是怎么选的]
category: current-interview
difficulty: 必问
priority: high
projects: [城市视图]
keywords: [React, TypeScript, Vite, Ant Design, 技术选型]
---

# 你这个项目为什么用 React 和 TypeScript？

## 核心回答

这个项目页面多，而且状态和交互比较复杂，像图表编辑器、地图、AI 对话和权限菜单都需要拆成独立组件，所以我用 React 来组织页面和组件状态。生态上也能直接接 Ant Design、ECharts、React Three Fiber 和 Redux Toolkit，比较适合这种后台可视化项目。

TypeScript 主要用来约束接口数据和组件参数。城市、环境、事件、仪表盘、图表和用户这些数据结构都不一样，如果只靠运行时看报错，字段写错或者把空值当数字会比较难排查。用类型把接口结果和表单数据说明清楚，编辑器就能更早提示问题。

Vite 负责本地开发和构建，启动和热更新都比较直接。Ant Design 提供表单、表格、弹窗和布局组件，让我把精力放在业务数据和交互上，而不是从头实现一套后台 UI。

## 追问：为什么不用 Vue？

Vue 也能完成这个项目，选择 React 不是因为 Vue 做不了，而是我希望用 React 完整练习一次后台项目，并且 React Three Fiber 本身就是按 React 组件方式组织 Three.js 场景。技术选择最终还是看团队经验和现有生态，这个项目里 React 的组件模型和相关库比较顺手。

## 追问：用了 TypeScript 就能保证接口数据一定正确吗？

不能。TypeScript 只在编译阶段检查我怎么使用数据，服务端真正返回的 JSON 不会因为写了类型就自动变正确。重要接口如果需要更强保证，还应该做运行时校验；当前项目主要依赖接口约定和类型声明，这个边界我会明确说明。
