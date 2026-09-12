---
id: aaron-basic-network-authentication-authorization
title: 前端隐藏按钮能防止越权吗？
aliases: [只做路由守卫能保证权限安全吗？, 前端和后端分别怎样控制访问权限？]
category: network
difficulty: 基础
priority: high
projects: []
keywords: [认证, 授权, 越权]
---

# 前端隐藏按钮能防止越权吗？

## 核心回答

不能。用户可以绕过界面直接调用接口。前端控制只用于体验，服务端应根据当前主体、资源和动作执行授权检查，并防止通过修改资源 ID 产生越权访问。

### 先分清认证和授权

- **认证（Authentication）**：确认“你是谁”，例如密码、短信验证码、Passkey 登录。
- **授权（Authorization）**：确认“你能做什么”，例如普通用户不能访问管理员接口。

前端的登录页、路由守卫、按钮显隐只是改善用户体验，不能承担最终安全控制。服务端必须对每一个受保护请求独立校验身份和权限。
