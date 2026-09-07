---
id: lidi-202609-password-handling
title: 轻购登录时密码是怎么处理的？
aliases: [密码加密, encryptPassword, 登录安全]
category: current-interview
difficulty: 进阶
priority: high
projects: [轻购]
keywords: [密码, CryptoJS, AES, HTTPS, login]
---

# 轻购登录时密码是怎么处理的？

## 核心回答

1. 我会先按真实代码说明：当前 `LoginView.vue` 提交的是表单里的 `passWord`，代码里虽然有 `src/utils/encrypt.ts` 的 AES 工具，但当前登录流程没有调用它。
2. 所以我不会把这个项目说成“密码已经在前端加密后发送”。前端做的传输安全应该依赖 HTTPS，服务端还要负责安全存储和校验密码。
3. `encryptPassword` 里使用固定密钥和 ECB 模式，即使接入也不能简单当成完整的密码安全方案，因为前端代码和固定密钥都可以被用户看到。
4. 正式项目应该和后端约定登录协议，使用 HTTPS，服务端保存密码哈希，不在日志和错误信息里打印密码；前端不要把密码长期存储。
5. 如果面试官问我如何改，我会说先确认后端是否已经要求加密字段，再决定是否接入协议，而不是为了“看起来加密”就直接把前端 AES 工具接进去。

