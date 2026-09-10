---
id: yunshu-followup-ai-key-storage
title: 追问：AI Key 为什么存在 localStorage？为什么不放 sessionStorage、内存、Cookie 或服务端？
aliases: [能讲讲项目中的AI Key 存储位置的取舍吗？, 关于AI Key 存储位置的取舍，能结合当前项目解释一下吗？]
category: yunshu
difficulty: 基础
priority: normal
projects: [云枢智慧城市数据平台]
keywords: [追问, AI Key, localStorage, 会话存储]
---

# 追问：AI Key 为什么存在 localStorage？为什么不放 sessionStorage、内存、Cookie 或服务端？

## 核心回答

这里允许用户配置自己的 AI Key，放 localStorage 主要是刷新、重新打开浏览器后还能用，不用反复填。但同源脚本能读到，有 XSS 或使用共享电脑时就有泄露风险。

sessionStorage 只是保存到当前标签页会话，内存刷新就丢，都不能阻止正在运行的恶意脚本读取。平台共用的 Key 更适合放服务端，用户自己的 Key 则可以提供仅本次使用和清除选项。

【这些改进目前还没做。Cookie 更适合配合服务端管理会话，也不能因为换个客户端保存位置，就认为共享 Key 已经保密。】

## 回答要点

- 这里允许用户配置自己的 AI Key，放 localStorage 主要是刷新、重新打开浏览器后还能用，不用反复填。
- sessionStorage 只是保存到当前标签页会话，内存刷新就丢，都不能阻止正在运行的恶意脚本读取。
- 这些改进目前还没做。Cookie 更适合配合服务端管理会话，也不能因为换个客户端保存位置，就认为共享 Key 已经保密。

## 面试官可能追问

- 仅改为内存保存能否消除当前页面中的 XSS 风险？
- 怎样区别用户自带 Key 与平台共享 Key 的管理？

## 代码证据

> **代码依据（不用于口述）**
>
> - [AI.tsx，第 36～43 行](/Users/aaron/personal-hub/apps/project-1/src/pages/AI.tsx:36)：从 localStorage 读取 AI 配置。
> - [AI.tsx，第 68～78 行](/Users/aaron/personal-hub/apps/project-1/src/pages/AI.tsx:68)：把 Key、Base URL 和模型名直接写入 localStorage。
> - [AI.tsx，第 149～166 行](/Users/aaron/personal-hub/apps/project-1/src/pages/AI.tsx:149)：把浏览器中的 Key 放进模型请求头。
