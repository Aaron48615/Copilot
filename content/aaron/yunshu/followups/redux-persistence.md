---
id: yunshu-followup-redux-persistence
title: 追问：Token 为什么放 Redux，又为什么用 redux-persist？只用 localStorage 不行吗？
aliases: [能讲讲项目中的Redux 与 redux-persist 保存 Token 的分工吗？, 关于Redux 与 redux-persist 保存 Token 的分工，能结合当前项目解释一下吗？]
category: yunshu
difficulty: 基础
priority: normal
projects: [云枢智慧城市数据平台]
keywords: [追问, Redux, redux-persist, PersistGate]
---

# 追问：Token 为什么放 Redux，又为什么用 redux-persist？只用 localStorage 不行吗？

## 核心回答

Redux 是让路由、用户信息和其他组件共用登录状态，登录、刷新 Token 或退出时能一起更新。localStorage 只能保存键值，直接改它不会让当前 React 组件自动重新渲染。

redux-persist 再把 Redux 保存下来，刷新后可以恢复；PersistGate 会等恢复完成再显示应用，避免恢复中误判未登录。

【目前持久化整个根状态，Token、用户和主题都会进 localStorage，这是方便使用，不是提高安全性。以后改 HttpOnly Cookie，需要后端一起调整会话和 CSRF 防护。】

## 回答要点

- Redux 是让路由、用户信息和其他组件共用登录状态，登录、刷新 Token 或退出时能一起更新。
- redux-persist 再把 Redux 保存下来，刷新后可以恢复；PersistGate 会等恢复完成再显示应用，避免恢复中误判未登录。
- 目前持久化整个根状态，Token、用户和主题都会进 localStorage，这是方便使用，不是提高安全性。

## 面试官可能追问

- 为什么只改 localStorage 不会自动更新当前组件？
- 持久化恢复完成前渲染路由可能出现什么问题？

## 代码证据

> **代码依据（不用于口述）**
>
> - [store/index.ts，第 8～28 行](/Users/aaron/personal-hub/apps/project-1/src/store/index.ts:8)：合并认证与主题状态，并用 redux-persist 持久化整个根 reducer。
> - [main.tsx，第 32～39 行](/Users/aaron/personal-hub/apps/project-1/src/main.tsx:32)：Redux Provider 和 PersistGate 的应用入口。
> - [authSlice.tsx，第 15～26 行](/Users/aaron/personal-hub/apps/project-1/src/store/slice/authSlice.tsx:15)：登录信息更新和退出清理。
