---
id: lidi-202609-login-flow
title: 轻购登录页面的完整流程是什么？
aliases: [登录流程, accessToken, loginApi, 表单验证]
category: current-interview
difficulty: 高频
priority: high
projects: [轻购]
keywords: [LoginView, loginApi, accessToken, localStorage, redirect]
---

# 轻购登录页面的完整流程是什么？

## 核心回答

1. 登录页用 Vant Form 和 Field 收集用户名、密码，并用正则校验用户名是 3 到 16 位字母、数字或下划线，密码是 6 到 16 位数字。
2. 提交时先判断 `submitting`，避免用户连续点击产生多个登录请求；然后调用 `loginApi`，把表单值作为 `userName` 和 `passWord` 发送给后端。
3. 登录成功要同时满足 `result.success` 和 `result.data.accessToken`，拿到 Token 后调用 `setToken` 写入本地存储，再提示登录成功。
4. 跳转时读取路由里的 `redirect`。如果它是字符串，就回到用户最开始访问的页面；没有 redirect 时进入首页。
5. 登录失败显示后端返回的消息，网络异常提示网络请求失败，最后在 `finally` 里解除提交状态。
6. 页面里的演示账号只是方便体验和测试，不代表正式产品应该把真实账号密码写进前端。

