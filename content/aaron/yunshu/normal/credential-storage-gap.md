---
id: yunshu-normal-credential-storage-gap
title: 不足一：浏览器长期保存 Token 和 AI Key
aliases: [能讲讲项目中的长期保存 Token 和 AI Key 的风险吗？, 关于长期保存 Token 和 AI Key 的风险，能结合当前项目解释一下吗？]
category: yunshu
difficulty: 进阶
priority: normal
projects: [云枢智慧城市数据平台]
keywords: [不足, localStorage, Token, AI Key]
---

# 不足一：浏览器长期保存 Token 和 AI Key

## 核心回答

Token 和 AI Key 现在都存在 localStorage，页面脚本能读取，XSS 或共享电脑上没有清理配置时，可能影响账号会话和模型额度。

我会考虑让后端用 Secure、HttpOnly Cookie 管会话，平台 AI Key 由服务端保管。用户自带 Key 至少改成内存或 sessionStorage，再加清除按钮，配合 CSP 和输入输出处理。

【这是后续改进方案。localStorage 主要是方便，前端再加 AES 不能解决密钥仍在客户端的问题。】

## 回答要点

- Token 和 AI Key 现在都存在 localStorage，页面脚本能读取，XSS 或共享电脑上没有清理配置时，可能影响账号会话和模型额度。
- 我会考虑让后端用 Secure、HttpOnly Cookie 管会话，平台 AI Key 由服务端保管。
- 这是后续改进方案。localStorage 主要是方便，前端再加 AES 不能解决密钥仍在客户端的问题。

## 面试官可能追问

- 换成 sessionStorage 能否阻止恶意脚本读取？
- 用户自带 Key 与平台共享 Key 的保存方案应怎样区分？

## 代码证据

> **代码依据（不用于口述）**
>
> - [store/index.ts，第 13～18 行](/Users/aaron/personal-hub/apps/project-1/src/store/index.ts:13)：整个 Redux 根状态使用 Web Storage 持久化。
> - [authSlice.tsx，第 5～26 行](/Users/aaron/personal-hub/apps/project-1/src/store/slice/authSlice.tsx:5)：持久化状态中包含 Token 和用户信息。
> - [AI.tsx，第 36～78 行](/Users/aaron/personal-hub/apps/project-1/src/pages/AI.tsx:36)：AI 配置包含 Key 并写入 localStorage。
