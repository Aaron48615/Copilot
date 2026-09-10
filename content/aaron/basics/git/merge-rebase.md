---
id: aaron-basic-git-merge-rebase
title: git merge 和 git rebase 有什么区别？
aliases: [合并分支时 merge 和 rebase 怎么选？, rebase 为什么会改变提交历史？]
category: git
difficulty: 进阶
priority: high
projects: []
keywords: [git merge, git rebase, 提交历史, 快进合并]
---

# git merge 和 git rebase 有什么区别？

## 核心回答

它们都能整合两个分支的修改，主要区别是提交记录最后长什么样。merge 会保留原来的分叉关系；如果两边都有新提交，通常会多一条合并提交。要是当前分支只是落后，也可能直接快进，不一定每次都生成新提交。

rebase 可以理解成，把当前分支自己的几次提交，挪到另一条分支最新提交的后面重新接上去。这样记录看起来是一条线，不过这些重新生成的提交，ID 也会变化。

我觉得 rebase 整理出来的一条线比较好读，适合整理自己还没分享出去的提交。如果分支已经和别人共用了，我更偏向 merge，保留原来的记录，大家同步时少一些麻烦。当然还是要跟团队的约定保持一致，两种方式都可能冲突，rebase 也不保证冲突更少。
