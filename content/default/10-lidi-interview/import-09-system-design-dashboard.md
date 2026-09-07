---
id: lidi-202609-import-09-system-design-dashboard
title: 设计一个可配置数据大屏，重点会考虑什么？
aliases: [数据大屏设计, dashboard 系统设计]
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [dashboard, 图表, 聚合, 刷新]
---

# 设计一个可配置数据大屏，重点会考虑什么？

## 核心回答

先定义图表配置契约：数据源、维度、指标、聚合方式、排序和展示类型都要有可校验的 schema。页面加载时按卡片并行请求，单卡失败不拖垮全屏；服务端尽量下推过滤和聚合，返回分页或摘要。实时刷新要能暂停、取消和恢复，图表实例复用并在卸载时销毁，数据量大时还要考虑虚拟化、采样和降级。

