---
id: shiguang-normal-security-boundaries
title: 不足三：前端 AES 和商品富文本仍有安全边界
aliases: [能讲讲项目中的前端 AES 和商品富文本的安全边界吗？, 关于前端 AES 和商品富文本的安全边界，能结合当前项目解释一下吗？]
category: shiguang
difficulty: 进阶
priority: normal
projects: [拾光集移动商城系统]
keywords: [不足, AES, v-html, XSS]
---

# 不足三：前端 AES 和商品富文本仍有安全边界

## 核心回答

我觉得这里有两处还需要继续处理。一个是 AES 的密钥固定放在前端，别人能看到，而且 ECB 也不能用来确认数据有没有被改过。所以我会先跟后端确认这层处理到底解决什么问题，再一起调整传输、密钥和重复请求的处理方式。

另一个是商品介绍用了 `v-html`，现在主要改了图片和表格样式、替换图片域名，没有清洗危险 HTML。如果不能完全信任内容来源，就应该让后端限制标签、属性和链接协议，前端再配合成熟的清洗库以及 CSP。

【时间戳拼进去以后，输入确实会变化，但能不能防止旧请求被重复发送，要看后端有没有检查，不能只看前端加了时间就说已经防重放。】

## 回答要点

- 我觉得这里有两处还需要继续处理。一个是 AES 的密钥固定放在前端，别人能看到，而且 ECB 也不能用来确认数据有没有被改过。
- 另一个是商品介绍用了 `v-html`，现在主要改了图片和表格样式、替换图片域名，没有清洗危险 HTML。
- 时间戳拼进去以后，输入确实会变化，但能不能防止旧请求被重复发送，要看后端有没有检查，不能只看前端加了时间就说已经防重放。

## 面试官可能追问

- 只删除 script 标签能否完整处理富文本风险？
- 前端加时间戳后，服务端还需要检查什么？

## 代码证据

> **代码依据（不用于口述）**
> - [cryptojs.ts 第 10～26 行](/Users/aaron/personal-hub/apps/project-2/src/utils/cryptojs.ts:10)：固定密钥、时间戳、ECB 和 Pkcs7。
> - [商品详情第 158～162 行](/Users/aaron/personal-hub/apps/project-2/src/views/ProdInfo.vue:158)：富文本通过 v-html 进入页面。
> - [utils.js 第 1～17 行](/Users/aaron/personal-hub/apps/project-2/src/utils/utils.js:1)：只处理图片和表格尺寸，没有清洗 HTML。
> - [shopImages.ts 第 3～19 行](/Users/aaron/personal-hub/apps/project-2/src/utils/shopImages.ts:3)：递归替换旧图片域名，不承担内容清洗。
