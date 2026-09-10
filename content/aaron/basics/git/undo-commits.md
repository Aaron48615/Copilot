---
id: aaron-basic-git-undo-commits
title: 提交错了怎么撤销，reset 和 revert 有什么区别？
aliases: [Git 提交后发现错误怎么处理？, 已经 push 的提交和只在本地的提交怎么回退？]
category: git
difficulty: 进阶
priority: high
projects: []
keywords: [git reset, git revert, git commit --amend, HEAD, 撤销提交]
---

# 提交错了怎么撤销，reset 和 revert 有什么区别？

## 核心回答

这个要分提交还在自己本地，还是已经推给别人了。如果还只在本地，只是提交说明写错了，可以用 git commit --amend -m "新的说明" 改最后一次提交。不过它会生成新的提交，暂存区里如果还有内容，也会一起带进去，所以改之前要看一下状态。

如果想撤回最近一次提交，但保留代码继续改，可以用 git reset --soft HEAD~1，修改还在暂存区。默认的 mixed 模式会把修改留在工作区，但不再暂存。HEAD~1 表示往父提交方向退一步，HEAD~2 就是两步，不是“保留两个提交”。

如果错误提交已经推上去了，别人可能已经拉取，我更偏向 git revert 提交ID。它会新增一条反向修改的提交，原来的记录还在，比直接改大家共享的历史容易配合。

reset 的 hard 模式还会覆盖工作区内容，不能当普通撤销随手用。我觉得回退最容易出问题的地方，就是没分清想撤掉的是提交记录，还是连代码也不要了，这个得先想清楚。
