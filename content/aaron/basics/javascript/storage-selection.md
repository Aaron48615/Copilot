---
id: aaron-basic-javascript-storage-selection
title: Cookie、localStorage 和 sessionStorage 怎么选
aliases: [请讲讲：Cookie、localStorage 和 sessionStorage 怎么选, 关于“Cookie、localStorage 和 sessionStorage 怎么选”，你会怎样回答？]
category: javascript
difficulty: 基础
priority: normal
projects: []
keywords: [Cookie, localStorage, sessionStorage]
---

# Cookie、localStorage 和 sessionStorage 怎么选

## 核心回答

这三种都能在浏览器保存数据，区别主要是会不会随请求发送、能保存多久，以及在哪些页面共享。Cookie 会按域名、路径、SameSite、Secure 等条件自动跟请求发送，单条通常是几 KB，适合保存少量会话标识；可以通过 Max-Age 或 Expires 设置有效期，不设置时一般是会话 Cookie。

localStorage 不会自动随请求发送，同源页面可以共享，没有内置的过期时间，适合保存一些需要跨页面保留的设置。sessionStorage 也不会自动发送，但按源和标签页会话隔离，刷新通常还在，关闭这个标签页后通常清除，适合临时表单状态。Web Storage 的容量通常按 MB 计算，不是 KB，具体配额还是要看环境。

【Cookie 不按端口隔离，作用范围和 Web Storage 的“同源”不是完全一样；会话恢复也可能恢复会话 Cookie。浏览器清理、隐私模式、配额和用户操作都可能让本地数据消失，所以不能把 localStorage 当成永不丢失的存储。】
