---
id: yunshu-followup-password-algorithms
title: 追问：密码用了什么加密？为什么不用 AES、MD5 或 SHA-256？
aliases: [能讲讲项目中的密码提交与 AES、摘要算法的区别吗？, 关于密码提交与 AES、摘要算法的区别，能结合当前项目解释一下吗？]
category: yunshu
difficulty: 进阶
priority: high
projects: [云枢智慧城市数据平台]
keywords: [追问, 密码哈希, HTTPS, 随机盐]
---

# 追问：密码用了什么加密？为什么不用 AES、MD5 或 SHA-256？

## 核心回答

现在前端没有对密码做 AES、MD5 或 SHA-256，提交的就是表单值。传输应该用 HTTPS，后端保存密码则用带随机盐、能设置计算成本的专用密码哈希，比如 Argon2id 或 bcrypt。

AES 能解回明文，不适合拿来作为普通密码的主要存储方式；MD5 和单次 SHA-256 太快，也不适合直接存密码。

【密码框显示圆点只是遮挡，不是加密。这个目录没有后端，实际用了什么算法无法确认；部署上游仍是 HTTP，也需要改成 HTTPS。】

## 回答要点

- 现在前端没有对密码做 AES、MD5 或 SHA-256，提交的就是表单值。
- AES 能解回明文，不适合拿来作为普通密码的主要存储方式；MD5 和单次 SHA-256 太快，也不适合直接存密码。
- 密码框显示圆点只是遮挡，不是加密。这个目录没有后端，实际用了什么算法无法确认；部署上游仍是 HTTP，也需要改成 HTTPS。

## 面试官可能追问

- 为什么单次 SHA-256 不适合直接保存密码？
- 只看前端提交代码能否判断后端密码存储算法？

## 代码证据

> **代码依据（不用于口述）**
>
> - [Login.tsx，第 33～47 行](/Users/aaron/personal-hub/apps/project-1/src/pages/Login.tsx:33)：登录密码作为接口参数提交，没有前端加密步骤。
> - [Register.tsx，第 33～43 行](/Users/aaron/personal-hub/apps/project-1/src/pages/Register.tsx:33)：注册密码的前端提交路径。
> - [Profile.tsx，第 90～96 行](/Users/aaron/personal-hub/apps/project-1/src/pages/Profile.tsx:90)：修改密码的前端提交路径。
> - [vercel.json，第 2～6 行](/Users/aaron/personal-hub/apps/project-1/vercel.json:2)：生产重写配置中的上游地址使用 HTTP。
