---
id: yunshu-followup-permission-boundary
title: 追问：隐藏菜单就能防越权吗？修改角色权限后，菜单会自动变化吗？
aliases: [能讲讲项目中的菜单隐藏和角色权限更新的边界吗？, 关于菜单隐藏和角色权限更新的边界，能结合当前项目解释一下吗？]
category: yunshu
difficulty: 基础
priority: normal
projects: [云枢智慧城市数据平台]
keywords: [追问, RBAC, 静态权限, 接口鉴权]
---

# 追问：隐藏菜单就能防越权吗？修改角色权限后，菜单会自动变化吗？

## 核心回答

隐藏菜单和跳 403 都是前端控制，用户还能改浏览器状态或直接调用接口，所以后端必须检查真实身份和数据权限。

当前角色页保存的是后端权限 ID，菜单和路由却用前端静态角色表，所以后台改权限后，菜单不会自动按新权限更新。我会让登录信息返回统一权限码，菜单、按钮和路由都用同一份数据。

【页面权限最好在业务内容渲染前判断，避免先显示出来再跳转。】

## 回答要点

- 隐藏菜单和跳 403 都是前端控制，用户还能改浏览器状态或直接调用接口，所以后端必须检查真实身份和数据权限。
- 当前角色页保存的是后端权限 ID，菜单和路由却用前端静态角色表，所以后台改权限后，菜单不会自动按新权限更新。
- 页面权限最好在业务内容渲染前判断，避免先显示出来再跳转。

## 面试官可能追问

- 后端更新权限后前端如何获得最新权限码？
- 无权限页面为什么最好在业务内容渲染前拦截？

## 代码证据

> **代码依据（不用于口述）**
>
> - [useAuthority.tsx，第 5～40 行](/Users/aaron/personal-hub/apps/project-1/src/hooks/useAuthority.tsx:5)：前端静态角色权限表。
> - [Layout.tsx，第 200～219 行](/Users/aaron/personal-hub/apps/project-1/src/layout/Layout.tsx:200)：页面路径检查和 403 跳转。
> - [Roles.tsx，第 159～175 行](/Users/aaron/personal-hub/apps/project-1/src/pages/Roles.tsx:159)：角色页向服务端提交权限 ID。
