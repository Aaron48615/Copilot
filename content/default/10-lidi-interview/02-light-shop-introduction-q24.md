---
id: lidi-202609-light-shop-ai-api-key
title: 前端如何保护或加密 AI 的 API Key？
aliases: [轻购的 AI 密钥和用户输入是怎么考虑安全的, 前端如何保护 Token 或 AI API Key, api key怎么加密, 前端保护密钥]
category: current-interview
difficulty: 高频
priority: high
projects: [轻购]
keywords: [API Key, 后端代理, VITE_, ai/chat, guide/recommend, 限流]
---

# 前端如何保护或加密 AI 的 API Key？

前端其实保护不了 API Key，正确做法是根本不要把 Key 放到前端。

因为浏览器里跑的代码，用户都能打开看。构建进去的环境变量、前端加密、代码混淆，都藏不住。像 Vite 里 `VITE_` 开头的变量，打包的时候会打进 JS，放到这里面跟写在源码里差不多。前端自己加密更不行，解密逻辑也在前端，等于锁和钥匙一起给出去。

轻购现在就是走后端代理。搜索联想和卖点请求 `/ai/chat`，导购请求 `/guide/recommend`，前端只传 prompt 或者用户输入，不会带模型 Key。Key 放在服务端，由后端去调模型。代码里也写了，正式项目不要在浏览器里存密钥，应该请求自己的后端代理。

但 Key 藏到后端还不等于安全。如果这个代理接口谁都能打，别人照样能拿你的额度去刷。所以服务端还得做鉴权、限流、限制输入长度和调用次数。前端按钮藏住、或者靠 CORS，挡不住别人直接打接口。

用户登录 Token 和模型 API Key 不是一回事。Key 放服务端，前端只调自己的业务接口。
