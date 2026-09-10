---
id: aaron-basic-git-check-upstream
title: 怎么判断当前分支是否落后于远程？
aliases: [怎样查看自己还缺少哪些远程提交？, Git 分支 ahead 和 behind 怎么理解？]
category: git
difficulty: 进阶
priority: normal
projects: []
keywords: [git fetch, ahead, behind, git log, git rev-list]
---

# 怎么判断当前分支是否落后于远程？

## 核心回答

判断之前得先 fetch 一次，不然本地看到的远程状态可能还是旧的。比如比较 origin/main，就先 git fetch origin，再看差异。

只想知道远程有哪些提交我还没有，可以用 git log --oneline HEAD..origin/main。没有输出，说明当前分支已经包含它的提交，但不代表两边完全一样，我自己也可能多了提交。

如果想快速看两边各多了多少提交，我比较喜欢 git rev-list --left-right --count HEAD...origin/main 这个结果，两列数字就能把情况说明白。比如输出 3 2，左边的 3 是我这边独有的提交，右边的 2 是远程有、我没有的提交。这样就知道不是单纯落后，而是两边都往前走了，后面需要整合一下。这里比较哪个远程、哪个分支，要换成项目实际用的。
