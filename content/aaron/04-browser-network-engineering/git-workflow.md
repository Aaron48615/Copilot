---
id: engineering-git-workflow
title: Git 是怎么用的？说说分支和提交规范
aliases: [git常用命令, 分支管理, 提交规范, reset和revert区别]
category: engineering
difficulty: 高频
priority: high
projects: []
keywords: [分支, commit, rebase, revert, 冲突]
---

# Git 是怎么用的？说说分支和提交规范

## 核心回答

一个常见流程是从主分支开功能分支，把改动拆成容易理解的小提交，完成后通过 PR 检查差异和测试结果，再合回主分支。提交信息要说清楚改了什么，方便之后查问题。

遇到冲突时，要看双方改动的目的，不能只选一边让冲突标记消失。解决后还要重新验证受影响的功能。

## 追问：已经共享的提交想撤回怎么办？

通常用 revert 创建一个反向提交，保留已有历史。本地尚未共享的提交可以根据需要 reset 或 rebase。改写共享历史会影响其他人的分支，需要按团队约定处理。
