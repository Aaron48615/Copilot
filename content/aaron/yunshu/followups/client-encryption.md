---
id: yunshu-followup-client-encryption
title: 追问：把 Key 用 AES 加密后再存，或者放到 Vite 环境变量，就安全了吗？
aliases: [能讲讲项目中的前端 AES 与 Vite 环境变量的保密边界吗？, 关于前端 AES 与 Vite 环境变量的保密边界，能结合当前项目解释一下吗？]
category: yunshu
difficulty: 进阶
priority: normal
projects: [云枢智慧城市数据平台]
keywords: [追问, AES, VITE_, 前端产物]
---

# 追问：把 Key 用 AES 加密后再存，或者放到 Vite 环境变量，就安全了吗？

## 核心回答

不能。前端用 AES 加密，解密的密钥和代码也还在浏览器，能执行脚本的人仍可能解出来。VITE_ 环境变量也会打进前端产物，适合公开配置，不适合平台 Key。

当前只是把 AI 配置转成 JSON 字符串保存，没有做 AES。平台 Key 要保护起来，应该把模型调用放服务端；用户自己的 Key 可以选择不长期保存。

## 回答要点

- 不能。前端用 AES 加密，解密的密钥和代码也还在浏览器，能执行脚本的人仍可能解出来。
- 当前只是把 AI 配置转成 JSON 字符串保存，没有做 AES。

## 面试官可能追问

- 解密密钥也在浏览器时加密存储解决了什么？
- 哪些配置适合放进 Vite 客户端环境变量？

## 代码证据

> **代码依据（不用于口述）**
>
> - [AI.tsx，第 68～78 行](/Users/aaron/personal-hub/apps/project-1/src/pages/AI.tsx:68)：配置经过 JSON 序列化后直接保存，没有加密步骤。
> - [AI.tsx，第 149～160 行](/Users/aaron/personal-hub/apps/project-1/src/pages/AI.tsx:149)：前端读取配置并生成 `X-AI-*` 请求头。
> - [amap.ts，第 1～4 行](/Users/aaron/personal-hub/apps/project-1/src/config/amap.ts:1)：项目中 `VITE_` 环境变量的实际客户端使用示例。
