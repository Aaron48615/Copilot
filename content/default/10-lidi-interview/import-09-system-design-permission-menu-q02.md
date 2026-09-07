---
id: lidi-202609-import-09-system-design-permission-menu-q02
title: 权限矩阵怎么测试？
aliases: []
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [权限, RBAC, 路由, 菜单]
---

# 权限矩阵怎么测试？

## 核心回答

用角色 × 页面 × 操作的表格生成测试数据，至少覆盖允许、拒绝、未知路径、未登录、Token 过期和刷新恢复。E2E 验证用户看见的菜单和跳转，接口测试验证服务端不会因为前端隐藏而放行。权限规则变更时，矩阵测试比手点几个页面更不容易漏。

