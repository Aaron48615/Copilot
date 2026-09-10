---
id: aaron-basic-git-common-commands
title: Git 常用指令有哪些？
aliases: [你平时会用到哪些 Git 命令？, 说几个 Git 常用命令和它们的作用。]
category: git
difficulty: 基础
priority: high
projects: []
keywords: [Git常用命令, git status, git add, git commit, git push, git log]
---

# Git 常用指令有哪些？

## 核心回答

常用的有 clone、status、diff、add、commit、push 这些。我比较喜欢顺着一次改代码的过程来记，这样命令和用途能对上。拿到项目先用 git clone 克隆，写完以后用 git status 看改了哪些文件，再用 git diff 看具体改动。确定这次要交哪些内容，就 git add 加到暂存区，git commit 保存成一次本地提交，最后 git push 推到远程。

分支相关的有 git branch 查看分支，git switch 切换分支，git switch -c 新建并切过去。要把别的分支合过来，就用 git merge。更新远程代码会用到 git fetch 或 git pull，查之前的提交就用 git log。

另外，临时切换任务可以用 git stash 保存没写完的修改。这些命令里，add、commit、push 最容易混：一个是选好要交的修改，一个是存到本地仓库，最后才是发到远程。把这三步分清楚，整个流程就比较好理解了。
