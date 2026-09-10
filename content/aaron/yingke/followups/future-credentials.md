---
id: yingke-followup-future-credentials
title: 追问：Token、密码和第三方密钥应该怎么处理？为什么不用 AES？
aliases: [能讲讲项目中的未来 Token、密码与第三方密钥的处理吗？, 关于未来 Token、密码与第三方密钥的处理，能结合当前项目解释一下吗？]
category: yingke
difficulty: 进阶
priority: normal
projects: [映刻影视]
keywords: [追问, Token, 密码哈希, 服务端密钥]
---

# 追问：Token、密码和第三方密钥应该怎么处理？为什么不用 AES？

## 核心回答

这个项目没有登录，也没处理密码、Token 或第三方密钥。以后要接入，API Secret 会放后端或云函数，前端只调用自己的接口；密码通过 HTTPS 传输，后端用专门的密码哈希保存，不用可逆的 AES 代替。

【Token 的保存方式和时间需要结合有效期、使用场景决定，放在客户端方便使用，不代表它就安全可信。】

## 回答要点

- 这个项目没有登录，也没处理密码、Token 或第三方密钥。
- Token 的保存方式和时间需要结合有效期、使用场景决定，放在客户端方便使用，不代表它就安全可信。

## 面试官可能追问

- 后端密码存储为什么不宜直接用可逆 AES？
- Token 保存方式需要结合哪些有效期和使用条件？

## 代码证据

> **代码依据（不用于口述）**
>
> - [utils/request.js 第 35～45 行](</Users/aaron/CodingPractice/14_uniapp/project2/utils/request.js:35>)：请求拦截器目前只是透传，没有注入 Token。
> - [package.json 第 12～16 行](</Users/aaron/CodingPractice/14_uniapp/project2/package.json:12>)：业务依赖中没有加密或鉴权相关库。
