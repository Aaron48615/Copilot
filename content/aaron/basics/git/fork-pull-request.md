---
id: aaron-basic-git-fork-pull-request
title: Fork、分支和 Pull Request 分别是什么？
aliases: [Fork 和新建分支有什么区别？, 给别人的仓库提 PR，大致是什么流程？]
category: git
difficulty: 基础
priority: normal
projects: []
keywords: [Fork, 分支, Pull Request, origin, upstream]
---

# Fork、分支和 Pull Request 分别是什么？

## 核心回答

分支是在同一个仓库里开一条开发线，Fork 则是在托管平台上，把别人的仓库复制一份到自己账号下。PR 是把修改提交给目标仓库，请对方检查并合并，它自己不是一条 Git 命令。

没有原仓库的写权限时，可以先 Fork，在自己的仓库里开功能分支，改完测试、提交并推送，然后向原仓库提 PR。之后对方让调整，继续往同一个分支推提交就能更新这个 PR，不用每改一次都新建一个。

Fork 项目里经常用 origin 指自己的仓库、upstream 指原仓库，但这只是常见命名，实际地址还是要用 git remote -v 看。如果本来就有原仓库的权限，我更偏向直接在原仓库开分支，能少维护一份仓库，也不用为了提 PR 特意再 Fork。
