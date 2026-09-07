---
id: lidi-202609-import-09-system-design-permission-menu-q01
title: 为什么不能只隐藏按钮？
aliases: []
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [权限, RBAC, 路由, 菜单]
---

# 为什么不能只隐藏按钮？

## 核心回答

隐藏按钮只能挡住正常点击，用户仍可手动构造请求或输入地址。服务端每个敏感接口都要根据当前用户和资源重新校验，前端按钮、路由和菜单只是三层不同的体验保护。权限变更后还要处理旧页面和缓存权限失效，不能让用户一直沿用旧结果。

