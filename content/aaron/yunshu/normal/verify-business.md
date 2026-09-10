---
id: yunshu-normal-verify-business
title: 普通业务流程
aliases: [能讲讲项目中的云枢普通业务流程的验证吗？, 关于云枢普通业务流程的验证，能结合当前项目解释一下吗？]
category: yunshu
difficulty: 基础
priority: normal
projects: [云枢智慧城市数据平台]
keywords: [登录, 权限, 业务流程]
---

# 普通业务流程

## 核心回答

我会先测验证码错误、登录失败和成功，再依次看首页、翻页、地图两种模式、3D、AI、图表创建和仪表盘，最后用有权限的账号检查用户和角色管理。

保存、删除后重新查列表或详情，不能只看成功提示。权限也会换角色直接输入 URL，对照菜单、403 和接口返回。

【当前没有覆盖整条流程的端到端测试，这次也没操作验证。后面可以用测试账号、可回滚数据和 Playwright 补主要流程。】

## 回答要点

- 我会先测验证码错误、登录失败和成功，再依次看首页、翻页、地图两种模式、3D、AI、图表创建和仪表盘，最后用有权限的账号检查用户和角色管理。
- 保存、删除后重新查列表或详情，不能只看成功提示。
- 当前没有覆盖整条流程的端到端测试，这次也没操作验证。

## 面试官可能追问

- 保存成功提示后为什么还要重新读取数据？
- 直接输入无权限路径应核对哪些页面与接口结果？

## 代码证据

> **代码依据（不用于口述）**
>
> - [router/index.tsx，第 30～182 行](/Users/aaron/personal-hub/apps/project-1/src/router/index.tsx:30)：普通业务流程涉及的页面路由。
> - [Login.tsx，第 33～57 行](/Users/aaron/personal-hub/apps/project-1/src/pages/Login.tsx:33)：登录成功和失败的前端处理。
> - [Layout.tsx，第 200～219 行](/Users/aaron/personal-hub/apps/project-1/src/layout/Layout.tsx:200)：直接访问页面时的 403 路径。
