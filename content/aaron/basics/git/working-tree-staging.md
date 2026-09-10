---
id: aaron-basic-git-working-tree-staging
title: 工作区、暂存区和仓库有什么区别？
aliases: [git add、git commit 和 git push 分别做了什么？, 代码从本地修改到推送远程会经过哪些地方？]
category: git
difficulty: 基础
priority: high
projects: []
keywords: [工作区, 暂存区, 本地仓库, 远程仓库, git diff]
---

# 工作区、暂存区和仓库有什么区别？

## 核心回答

工作区就是编辑器里正在改的那些文件。暂存区可以理解成“这次准备提交哪些修改”，git add 就是把选中的内容放进去。git commit 再把暂存区里的内容存成一条本地记录，git push 才会把提交发到远程。

比如同时改了登录页和首页，这次只想交登录功能，就可以只 add 登录相关的文件。我挺喜欢暂存区这个设计，可以把一件事的修改放在一次提交里，后面看记录比较清楚。add 以后又继续改了这个文件，后面新增的修改不会自动跟着进暂存区，还得再 add 一次。

检查时，git diff 看的是还没暂存的修改，git diff --cached 看的是已经暂存、准备提交的修改。如果发现暂存错了文件，可以用 git restore --staged 文件名 撤出暂存区，写过的内容还留在工作区里。这样只是取消了“准备提交”的状态，不需要把代码重新写一遍。
