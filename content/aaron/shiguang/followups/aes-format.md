---
id: shiguang-followup-aes-format
title: 追问：AES 加密具体是怎么做的？密钥长度、模式和填充是什么？
aliases: [能讲讲项目中的登录 AES 的密钥、模式和填充吗？, 关于登录 AES 的密钥、模式和填充，能结合当前项目解释一下吗？]
category: shiguang
difficulty: 进阶
priority: normal
projects: [拾光集移动商城系统]
keywords: [追问, AES-128, ECB, Pkcs7]
---

# 追问：AES 加密具体是怎么做的？密钥长度、模式和填充是什么？

## 核心回答

登录和注册提交前，先把当前毫秒时间戳拼到密码前面，再把内容和固定密钥转成 CryptoJS 的 UTF-8 WordArray，交给 AES 处理。密钥是 16 个 ASCII 字节，也就是 AES-128，用 ECB 模式、Pkcs7 填充，最后转成 Base64 文本提交。

【Base64 只是方便传输，没有再加密一次。AES 的分组固定是 16 字节，128 指的是密钥位数。Pkcs7 也不是补零，比如差 3 字节就补 3 个值为 3 的字节，已经对齐也要补一个完整分组。】

## 回答要点

- 登录和注册提交前，先把当前毫秒时间戳拼到密码前面，再把内容和固定密钥转成 CryptoJS 的 UTF-8 WordArray，交给 AES 处理。
- Base64 只是方便传输，没有再加密一次。

## 面试官可能追问

- 明文刚好对齐一个分组时 Pkcs7 还要填充吗？
- Base64 编码与 AES 加密分别负责什么？

## 代码证据

> **代码依据（不用于口述）**
> - [cryptojs.ts 第 10～26 行](/Users/aaron/personal-hub/apps/project-2/src/utils/cryptojs.ts:10)：时间戳、UTF-8 转换、AES、ECB、Pkcs7 和序列化。
> - 原理参考：[NIST AES 标准](https://csrc.nist.gov/pubs/fips/197/final)、[RFC 5652 填充规则](https://www.rfc-editor.org/rfc/rfc5652.html#section-6.3)。
