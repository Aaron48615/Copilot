---
id: yunshu-normal-password-logs-gap
title: 不足二：密码链路和日志还有安全边界
aliases: [能讲讲项目中的密码传输和登录响应日志的边界吗？, 关于密码传输和登录响应日志的边界，能结合当前项目解释一下吗？]
category: yunshu
difficulty: 进阶
priority: normal
projects: [云枢智慧城市数据平台]
keywords: [不足, HTTPS, Token, 日志]
---

# 不足二：密码链路和日志还有安全边界

## 核心回答

登录页现在会打印完整登录响应，可能包含 Token，代理上游又是 HTTP，存在敏感信息暴露风险。我会先删除响应日志，把上游改成 HTTPS，再由后端用可靠的加盐密码哈希保存密码，前端负责输入和交互校验。

【当前密码由表单提交给接口，后端实际存储方式从前端看不到，也没有证据说明这些风险已经造成线上故障。】

## 回答要点

- 登录页现在会打印完整登录响应，可能包含 Token，代理上游又是 HTTP，存在敏感信息暴露风险。
- 当前密码由表单提交给接口，后端实际存储方式从前端看不到，也没有证据说明这些风险已经造成线上故障。

## 面试官可能追问

- 浏览器到平台是 HTTPS，后半段为什么仍可能暴露数据？
- 仅查看前端能否确认后端密码哈希方案？

## 代码证据

> **代码依据（不用于口述）**
>
> - [Login.tsx，第 33～54 行](/Users/aaron/personal-hub/apps/project-1/src/pages/Login.tsx:33)：提交密码并打印登录响应和错误。
> - [auth.ts，第 4～10 行](/Users/aaron/personal-hub/apps/project-1/src/api/auth.ts:4)：登录接口调用。
> - [vercel.json，第 2～6 行](/Users/aaron/personal-hub/apps/project-1/vercel.json:2)：接口重写到 HTTP 上游。
