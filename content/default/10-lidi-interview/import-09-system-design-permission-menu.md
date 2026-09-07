---
id: lidi-202609-import-09-system-design-permission-menu
title: 前端权限菜单和路由保护怎么设计？
aliases: [权限系统设计, 路由权限, 菜单过滤]
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [权限, RBAC, 路由, 菜单]
---

# 前端权限菜单和路由保护怎么设计？

## 核心回答

菜单过滤解决“用户看见什么”，路由保护解决“用户直接输入 URL 能不能进”，两者都要做；真正的授权仍然在服务端，前端只是提升体验。权限数据应该是可版本化的角色和资源集合，登录恢复后先加载权限再渲染受保护路由。未知资源默认拒绝，401 清理会话并回到登录页，403 保留登录态但显示无权访问。

