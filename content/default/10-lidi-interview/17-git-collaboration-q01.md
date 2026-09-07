---
id: lidi-202609-git-collaboration-q01
title: `merge` 和 `rebase` 有什么区别？
aliases: []
category: current-interview
difficulty: 高频
priority: high
projects: []
keywords: [Git, branch, merge, rebase, revert, reset, conflict, commit]
---

# `merge` 和 `rebase` 有什么区别？

## 核心回答

1. `merge` 会把两个分支的历史合并起来，可能产生一个合并提交，原来的提交关系保留得更完整。
2. `rebase` 会把当前分支的提交重新放到目标分支最新提交之后，历史看起来更线性，但会改写提交哈希。
3. 个人分支整理提交时可以使用 rebase；已经被别人使用的公共分支不应该随意 rebase，否则别人本地历史会对不上。
4. 团队具体采用哪种方式要遵守项目规范，关键是不要因为追求“历史好看”破坏协作。

