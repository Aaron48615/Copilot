---
id: yunshu-normal-user-role-management
title: 用户、角色和个人中心
aliases: [能讲讲项目中的用户、角色与个人中心功能吗？, 关于用户、角色与个人中心功能，能结合当前项目解释一下吗？]
category: yunshu
difficulty: 基础
priority: normal
projects: [云枢智慧城市数据平台]
keywords: [RBAC, 用户管理, 业务码]
---

# 用户、角色和个人中心

## 核心回答

管理员可以查询、新建、编辑用户，分配角色，启用禁用账号，还能重置密码、删除用户和上传头像。角色页可以新建编辑角色、看角色人数和配置权限树，普通用户在个人中心看资料、改密码和退出登录。

前端会检查必填项、文件类型和大小，接口返回后再判断业务码，成功才刷新列表。当前账号、root 和超级管理员的一些危险操作会被禁用。

【按钮禁用主要防误操作，后端仍要检查操作者权限、关联数据和受保护账号。密码哈希、随机密码生成方式，从前端代码看不到。】

## 回答要点

- 管理员可以查询、新建、编辑用户，分配角色，启用禁用账号，还能重置密码、删除用户和上传头像。
- 前端会检查必填项、文件类型和大小，接口返回后再判断业务码，成功才刷新列表。
- 按钮禁用主要防误操作，后端仍要检查操作者权限、关联数据和受保护账号。

## 面试官可能追问

- 前端禁用危险按钮后后端还要检查什么？
- 上传头像时类型和大小校验分别放在哪里？

## 代码证据

> **代码依据（不用于口述）**
>
> - [Users.tsx，第 75～113 行](/Users/aaron/personal-hub/apps/project-1/src/pages/Users.tsx:75)：受保护账号判断、用户列表和角色列表加载。
> - [Users.tsx，第 141～180 行](/Users/aaron/personal-hub/apps/project-1/src/pages/Users.tsx:141)：新建、编辑、角色分配和状态修改流程。
> - [Users.tsx，第 182～270 行](/Users/aaron/personal-hub/apps/project-1/src/pages/Users.tsx:182)：启停、重置密码和删除确认。
> - [Users.tsx，第 273～300 行](/Users/aaron/personal-hub/apps/project-1/src/pages/Users.tsx:273)：头像格式、大小检查和上传。
> - [Roles.tsx，第 56～92 行](/Users/aaron/personal-hub/apps/project-1/src/pages/Roles.tsx:56)：角色、角色人数和权限树加载。
> - [Roles.tsx，第 112～200 行](/Users/aaron/personal-hub/apps/project-1/src/pages/Roles.tsx:112)：角色保存、权限保存和角色删除。
> - [Profile.tsx，第 81～124 行](/Users/aaron/personal-hub/apps/project-1/src/pages/Profile.tsx:81)：修改密码和退出登录。
> - [users.ts，第 33～79 行](/Users/aaron/personal-hub/apps/project-1/src/api/users.ts:33)：用户、状态、密码、角色和头像接口。
