---
id: lidi-202609-import-03-frameworks-vue-provide-inject
title: Vue 的 provide / inject 适合放什么状态？
aliases: [Vue provide inject, 依赖注入边界]
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [provide, inject, Vue, 依赖注入, Pinia]
---

# Vue 的 provide / inject 适合放什么状态？

## 核心回答

provide / inject 适合把一组有明确上下文的能力传给深层后代，比如表单上下文、主题、组件库配置或当前页面服务；它能避免层层透传 props，但依赖关系也会变得隐含。跨页面、需要调试和持久化的业务状态更适合 Pinia 或 URL。注入对象要定义清楚读写方向，必要时只提供 readonly 状态和操作函数。

