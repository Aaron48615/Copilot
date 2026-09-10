---
id: aaron-basic-git-git-workflow
title: Git 是什么，和 SVN 有什么区别？
aliases: [你怎么理解 Git？, Git 为什么叫分布式版本控制工具？]
category: git
difficulty: 基础
priority: normal
projects: []
keywords: [Git, 版本控制, 分布式, SVN]
---

# Git 是什么，和 SVN 有什么区别？

## 核心回答

Git 就是用来记录代码变化、管理版本的工具。比如一个功能改坏了，可以看看之前怎么写的；几个人一起写代码，也能把各自的修改合到一起，不用来回传文件夹。我觉得方便的地方就在这儿：代码改过哪些地方、为什么改，后面还能回头查。

它和 SVN 一个比较大的区别是，Git 本地也有仓库和提交历史，所以断网时还能提交、看记录、建分支，联网后再同步到远端。SVN 更依赖中央服务器，提交这些操作一般需要连接服务器。

Git 和 GitHub 也不是一个东西。Git 是版本控制工具，GitHub 是托管仓库、做协作的平台，用 Git 不一定要把代码放到 GitHub。
