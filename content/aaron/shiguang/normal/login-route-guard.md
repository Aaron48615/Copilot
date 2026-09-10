---
id: shiguang-normal-login-route-guard
title: 注册登录和路由鉴权
aliases: [能讲讲项目中的注册登录和路由鉴权流程吗？, 关于注册登录和路由鉴权流程，能结合当前项目解释一下吗？]
category: shiguang
difficulty: 进阶
priority: normal
projects: [拾光集移动商城系统]
keywords: [Token, Vue Router, AES]
---

# 注册登录和路由鉴权

## 核心回答

注册登录这块，我用 Vant Form 收集用户名和密码，提交前先检查格式。密码会和时间戳拼在一起，再用 CryptoJS 做 AES 处理后发给接口。登录成功就把 accessToken 存到 localStorage，之后 Axios 会自动带上。

页面跳转用的是 Vue Router 的全局前置守卫。登录、注册可以直接进，其他页面先看本地有没有 Token，没有就跳登录页；退出的时候删掉 Token，再回到登录页。

【不过这个守卫只是前端控制跳转，有 Token 不代表 Token 一定有效，过期和权限还是要后端判断。AES 也只是当前的提交方式，不能代替 HTTPS，更不能据此判断后端怎么存密码。】

## 回答要点

- 注册登录这块，我用 Vant Form 收集用户名和密码，提交前先检查格式。
- 页面跳转用的是 Vue Router 的全局前置守卫。
- 不过这个守卫只是前端控制跳转，有 Token 不代表 Token 一定有效，过期和权限还是要后端判断。

## 面试官可能追问

- 本地有 Token 但服务端返回 401 时应该怎样处理？
- 退出时还有哪些用户相关数据需要检查是否清理？

## 代码证据

> **代码依据（不用于口述）**
> - [注册页第 67～92 行](/Users/aaron/personal-hub/apps/project-2/src/views/Register.vue:67)：注册提交和输入校验。
> - [登录页第 74～101 行](/Users/aaron/personal-hub/apps/project-2/src/views/Login.vue:74)：登录提交、Token 保存和输入校验。
> - [cryptojs.ts 第 10～26 行](/Users/aaron/personal-hub/apps/project-2/src/utils/cryptojs.ts:10)：时间戳拼接、AES、ECB 和 Pkcs7 配置。
> - [auth.ts 第 1～10 行](/Users/aaron/personal-hub/apps/project-2/src/utils/auth.ts:1)：Token 的保存、读取和删除。
> - [路由第 72～82 行](/Users/aaron/personal-hub/apps/project-2/src/router/index.ts:72)：白名单和全局前置守卫。
> - [个人中心第 79～82、132～135 行](/Users/aaron/personal-hub/apps/project-2/src/views/Mine.vue:79)：退出按钮及处理函数。
