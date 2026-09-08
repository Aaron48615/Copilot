---
id: lidi-202609-git-collaboration-q04
title: 常见git命令
aliases: []
category: current-interview
difficulty: 高频
priority: high
projects: []
keywords: [Git, clone, status, add, commit, pull, push, branch, switch, checkout, merge, log, diff, restore, reset, fetch]
---

# 常见git命令

我平时开发里常用的 Git 命令主要有这些。

首先是基础操作，`git clone` 用来克隆远程仓库，`git status` 查看当前文件状态，`git add` 把修改加入暂存区，`git commit` 提交代码，`git pull` 拉取远程最新代码，`git push` 把本地提交推到远程仓库。

分支方面，我会用 `git branch` 查看分支，`git switch` 或者 `git checkout` 切换分支，`git switch -c` 创建并切换新分支，功能开发完成之后用 `git merge` 合并分支。

平时排查代码问题的时候，我也会用 `git log` 看提交记录，`git diff` 查看具体修改内容。

如果代码改错了，工作区还没提交的话可以用 `git restore` 撤销修改；如果已经 add 进暂存区，可以取消暂存。提交历史需要调整时也会用到 `git reset`，不过这个命令我会比较谨慎，因为不同参数对工作区和提交记录的影响不一样。

另外还有 `git fetch`，它只会把远程最新信息拉到本地，不会直接合并代码；而 `git pull` 一般可以理解成先 `fetch`，再把远程代码合并到当前分支。

实际开发流程一般就是：先 pull 最新代码，然后创建自己的功能分支，开发完成后 add、commit、push，再通过 merge 或者 PR 合并到主分支。

如果出现代码冲突，我会先手动处理冲突文件，确认保留哪部分代码，然后重新 add 和 commit。
