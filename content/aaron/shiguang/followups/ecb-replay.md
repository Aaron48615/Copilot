---
id: shiguang-followup-ecb-replay
title: 追问：为什么使用 ECB，不用 CBC 或 GCM？加上时间戳能防重放吗？
aliases: [能讲讲项目中的ECB 的局限和时间戳防重放边界吗？, 关于ECB 的局限和时间戳防重放边界，能结合当前项目解释一下吗？]
category: shiguang
difficulty: 进阶
priority: normal
projects: [拾光集移动商城系统]
keywords: [追问, ECB, GCM, 重放攻击]
---

# 追问：为什么使用 ECB，不用 CBC 或 GCM？加上时间戳能防重放吗？

## 核心回答

当前用的是 ECB，但不能把它说成更安全。同一个密钥下，相同明文分组会得到相同密文，而且不能检查内容有没有被篡改。CBC 需要处理随机 IV，GCM 能同时检查完整性，但即使换了模式，固定写在前端的密钥仍然能被看到，修改也需要和后端配合。

加时间戳只是让多数请求的输入不同，不能单靠它防重放。别人重复发送同一份密文，后端还要检查时间窗口和重复请求。

【时间戳不是随机 IV，即使检查了时间，也要处理有效时间内的重复发送。现在能确认前端拼了 `Date.now()`，后端是否做了这些检查还不知道。】

## 回答要点

- 当前用的是 ECB，但不能把它说成更安全。同一个密钥下，相同明文分组会得到相同密文，而且不能检查内容有没有被篡改。
- 加时间戳只是让多数请求的输入不同，不能单靠它防重放。
- 时间戳不是随机 IV，即使检查了时间，也要处理有效时间内的重复发送。

## 面试官可能追问

- 相同明文分组在 ECB 下会暴露什么特征？
- 时间窗口内重复发送同一密文怎样识别？

## 代码证据

> **代码依据（不用于口述）**
> - [cryptojs.ts 第 12～23 行](/Users/aaron/personal-hub/apps/project-2/src/utils/cryptojs.ts:12)：时间戳、ECB 和 Pkcs7。
> - 原理参考：[OWASP 加密模式建议](https://cheatsheetseries.owasp.org/cheatsheets/Cryptographic_Storage_Cheat_Sheet.html)。
