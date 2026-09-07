---
id: lidi-202609-git-collaboration-q03
title: `reset`、`revert` 和 `checkout` 怎么区别？
aliases: []
category: current-interview
difficulty: 高频
priority: high
projects: []
keywords: [Git, branch, merge, rebase, revert, reset, conflict, commit]
---

# `reset`、`revert` 和 `checkout` 怎么区别？

## 核心回答

1. `revert` 会新增一个反向提交，适合公共分支，因为不会删除已有历史。
2. `reset` 会移动当前分支指针，可能改变工作区和暂存区，适合本地整理还没有共享的提交。
3. `checkout` 旧版本既可以切换分支，也可以恢复文件；现在通常用 `switch` 切分支、`restore` 恢复文件，语义更清楚。
4. 涉及未提交改动时，我会先确认文件范围和是否需要备份，避免误操作覆盖用户自己的修改。

