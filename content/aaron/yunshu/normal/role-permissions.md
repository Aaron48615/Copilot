---
id: yunshu-normal-role-permissions
title: 基于角色的页面权限控制
aliases: [能讲讲项目中的基于角色的页面权限控制吗？, 关于基于角色的页面权限控制，能结合当前项目解释一下吗？]
category: yunshu
difficulty: 基础
priority: normal
projects: [云枢智慧城市数据平台]
keywords: [RBAC, 静态角色表, 403]
---

# 基于角色的页面权限控制

## 核心回答

不同角色能看的菜单和页面不一样。普通用户能看首页、地图、AI 和个人中心，管理员还能进数据管理和系统管理。前端先按角色过滤一级菜单，再把没权限的具体菜单禁用，直接输入没权限的路径也会跳 403。

角色页能读取权限树并提交权限 ID，这就是给角色配权限、再把角色分给用户的 RBAC 思路。不过页面判断目前仍然用前端静态角色表，还没有直接接角色页的权限树。

【这样角色的权限可以复用，不用逐个用户配置。但静态表和后端配置可能不同，接口能访问哪些数据仍要后端检查。】

## 回答要点

- 不同角色能看的菜单和页面不一样。普通用户能看首页、地图、AI 和个人中心，管理员还能进数据管理和系统管理。
- 角色页能读取权限树并提交权限 ID，这就是给角色配权限、再把角色分给用户的 RBAC 思路。
- 这样角色的权限可以复用，不用逐个用户配置。但静态表和后端配置可能不同，接口能访问哪些数据仍要后端检查。

## 面试官可能追问

- 角色页修改权限后为什么菜单不一定更新？
- 隐藏菜单为什么不能代替接口权限校验？

## 代码证据

> **代码依据（不用于口述）**
>
> - [useAuthority.tsx，第 5～45 行](/Users/aaron/personal-hub/apps/project-1/src/hooks/useAuthority.tsx:5)：前端角色到权限字符串的静态映射及权限判断。
> - [Layout.tsx，第 25～131 行](/Users/aaron/personal-hub/apps/project-1/src/layout/Layout.tsx:25)：菜单角色范围、权限名推导、菜单过滤和禁用处理。
> - [Layout.tsx，第 145～151 行](/Users/aaron/personal-hub/apps/project-1/src/layout/Layout.tsx:145)：根据当前角色生成菜单。
> - [Layout.tsx，第 200～219 行](/Users/aaron/personal-hub/apps/project-1/src/layout/Layout.tsx:200)：直接访问路径时的页面权限检查和 403 跳转。
> - [Roles.tsx，第 136～175 行](/Users/aaron/personal-hub/apps/project-1/src/pages/Roles.tsx:136)：读取角色详情、回显权限并提交权限 ID。
> - [roles.ts，第 46～76 行](/Users/aaron/personal-hub/apps/project-1/src/api/roles.ts:46)：角色、权限树和角色权限关系接口。
