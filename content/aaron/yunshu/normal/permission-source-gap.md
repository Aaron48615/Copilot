---
id: yunshu-normal-permission-source-gap
title: 不足三：菜单权限与角色管理数据没有统一来源
aliases: [能讲讲项目中的菜单权限与角色数据来源不一致的问题吗？, 关于菜单权限与角色数据来源不一致的问题，能结合当前项目解释一下吗？]
category: yunshu
difficulty: 基础
priority: normal
projects: [云枢智慧城市数据平台]
keywords: [不足, 静态角色表, 权限码, RBAC]
---

# 不足三：菜单权限与角色管理数据没有统一来源

## 核心回答

角色页能读写权限树，但菜单和路由仍然按 useAuthority 里的静态表判断。后端改权限或者新增角色，前端没同步，就可能禁错菜单、进去又跳 403，或者两边判断不同。

我会让登录或用户信息接口返回统一权限码，菜单、按钮和路由都用这份数据，后端继续校验接口。

【目前动态权限配置还没有完整接到页面判断里。】

## 回答要点

- 角色页能读写权限树，但菜单和路由仍然按 useAuthority 里的静态表判断。
- 我会让登录或用户信息接口返回统一权限码，菜单、按钮和路由都用这份数据，后端继续校验接口。
- 目前动态权限配置还没有完整接到页面判断里。

## 面试官可能追问

- 新增角色后前端静态表没更新会发生什么？
- 统一权限码后接口权限是否仍需后端校验？

## 代码证据

> **代码依据（不用于口述）**
>
> - [useAuthority.tsx，第 5～40 行](/Users/aaron/personal-hub/apps/project-1/src/hooks/useAuthority.tsx:5)：页面实际使用的静态角色权限表。
> - [Layout.tsx，第 101～131 行](/Users/aaron/personal-hub/apps/project-1/src/layout/Layout.tsx:101)：菜单权限从路径字符串推导。
> - [Roles.tsx，第 136～175 行](/Users/aaron/personal-hub/apps/project-1/src/pages/Roles.tsx:136)：角色页读写服务端权限关系。
