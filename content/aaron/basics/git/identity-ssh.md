---
id: aaron-basic-git-identity-ssh
title: Git 配置的用户名、邮箱和 SSH 密钥分别有什么用？
aliases: [git config 设置的身份就是 GitHub 登录信息吗？, 为什么配了 Git 邮箱还需要 SSH 认证？]
category: git
difficulty: 基础
priority: normal
projects: []
keywords: [git config, 用户名, 邮箱, SSH公钥, 身份认证]
---

# Git 配置的用户名、邮箱和 SSH 密钥分别有什么用？

## 核心回答

用户名和邮箱主要是写进提交记录里，让人知道这次修改是谁提交的，可以用 git config 设置，用 git config --list 查看。它查看的是配置，不是本地文件目录。

SSH 密钥解决的是连接远程仓库时的身份认证。用 SSH 方式时，把公钥放到托管平台，私钥留在自己电脑上。克隆时填的是仓库提供的 SSH 地址，不是把密钥内容填到 git clone 后面。

这两件事分开记就清楚了：用户名、邮箱说明提交记录上写谁，SSH 认证关系到远程平台是否允许访问。配置了邮箱不代表就登录了 GitHub，也不代表自动有别人的仓库权限。
