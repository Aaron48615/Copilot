---
id: shiguang-normal-auth-rules-gap
title: 不足二：登录校验规则和登录态处理还需要统一
aliases: [能讲讲项目中的登录规则和登录态处理的不足吗？, 关于登录规则和登录态处理的不足，能结合当前项目解释一下吗？]
category: shiguang
difficulty: 进阶
priority: normal
projects: [拾光集移动商城系统]
keywords: [不足, 密码校验, 401, Token]
---

# 不足二：登录校验规则和登录态处理还需要统一

## 核心回答

登录这块我觉得先要把规则统一。现在注册和登录用了不同的校验，比如小写字母加数字的密码，注册可能通过，登录却被另一套正则拦住。我会把共用规则整理出来，再跟后端对齐，登录主要检查必填和长度，不应该再拿另一套复杂度要求拦住已经注册的密码。

另外路由现在只看有没有 Token，过期、401 和刷新还没统一处理。后面要按后端的认证方式补上失效后的状态清理和重新登录。

【如果后端支持，也可以一起考虑 HttpOnly Cookie 会话。不过真正的身份和权限判断始终是在后端。】

## 回答要点

- 登录这块我觉得先要把规则统一。现在注册和登录用了不同的校验，比如小写字母加数字的密码，注册可能通过，登录却被另一套正则拦住。
- 另外路由现在只看有没有 Token，过期、401 和刷新还没统一处理。
- 如果后端支持，也可以一起考虑 HttpOnly Cookie 会话。

## 面试官可能追问

- 为什么注册允许的密码不应该被登录复杂度规则拦住？
- 会话改为 Cookie 时代理需要配合什么变化？

## 代码证据

> **代码依据（不用于口述）**
> - [注册页第 90～92 行](/Users/aaron/personal-hub/apps/project-2/src/views/Register.vue:90)：注册要求至少包含小写字母和数字。
> - [登录页第 96～101 行](/Users/aaron/personal-hub/apps/project-2/src/views/Login.vue:96)：登录规则排除了部分注册页允许的组合。
> - [路由第 72～82 行](/Users/aaron/personal-hub/apps/project-2/src/router/index.ts:72)：只检查 Token 是否存在。
> - [request.ts 第 27～55 行](/Users/aaron/personal-hub/apps/project-2/src/utils/request.ts:27)：注入 Token，但错误响应只向页面继续抛出。
