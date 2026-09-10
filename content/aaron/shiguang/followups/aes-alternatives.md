---
id: shiguang-followup-aes-alternatives
title: 追问：为什么用 AES，不用 RSA、MD5 或 SHA-256？有 HTTPS 还需要前端加密吗？
aliases: [能讲讲项目中的AES 与其他密码算法及 HTTPS 的关系吗？, 关于AES 与其他密码算法及 HTTPS 的关系，能结合当前项目解释一下吗？]
category: shiguang
difficulty: 进阶
priority: normal
projects: [拾光集移动商城系统]
keywords: [追问, AES, HTTPS, 密码哈希]
---

# 追问：为什么用 AES，不用 RSA、MD5 或 SHA-256？有 HTTPS 还需要前端加密吗？

## 核心回答

现在接口收到的是 AES 处理后的结果，真要换算法，前后端得一起改。AES 是对称加密，RSA 用公钥和私钥，MD5、SHA-256 是摘要算法，不能解回原文，所以它们不是直接替换的关系。

前端 AES 不能代替 HTTPS，也不能代替后端保存密码时的哈希。传输用 HTTPS，后端存储应该用带盐、可以设置计算成本的专用密码哈希，比如 Argon2id。

【这套 AES 格式是不是后端文档明确要求的，还没核对。后端不应该保存可逆密码，简单做一次 SHA-256 也不够。如果接口没有额外要求，我不会为了看起来更安全，自己设计一套加密协议。】

## 回答要点

- 现在接口收到的是 AES 处理后的结果，真要换算法，前后端得一起改。
- 前端 AES 不能代替 HTTPS，也不能代替后端保存密码时的哈希。
- 这套 AES 格式是不是后端文档明确要求的，还没核对。

## 面试官可能追问

- 后端为什么不宜直接用一次 SHA-256 保存密码？
- 更换前端提交算法前需要确认哪些接口约定？

## 代码证据

> **代码依据（不用于口述）**
> - [登录页第 74～86 行](/Users/aaron/personal-hub/apps/project-2/src/views/Login.vue:74)：提交 AES 处理后的密码。
> - [cryptojs.ts 第 19～26 行](/Users/aaron/personal-hub/apps/project-2/src/utils/cryptojs.ts:19)：实际采用的算法参数。
> - 原理参考：[OWASP 密码存储](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html)、[OWASP 加密存储](https://cheatsheetseries.owasp.org/cheatsheets/Cryptographic_Storage_Cheat_Sheet.html)。
