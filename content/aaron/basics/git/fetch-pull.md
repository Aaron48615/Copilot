---
id: aaron-basic-git-fetch-pull
title: git fetch 和 git pull 有什么区别？
aliases: [fetch 和 pull 都能更新代码，区别在哪？, 为什么有时候先 fetch 再 merge？]
category: git
difficulty: 基础
priority: high
projects: []
keywords: [git fetch, git pull, git merge, 远程跟踪分支]
---

# git fetch 和 git pull 有什么区别？

## 核心回答

fetch 是先把远程的新提交取到本地，但不直接合进我正在开发的分支。比如 git fetch origin 更新了本地记录的 origin/main，我当前分支里的代码不会因此直接变掉。

pull 则是取回来以后，还要继续把更新整合进当前分支。它后面走 merge 还是 rebase，要看配置和参数，所以不能认为 pull 永远只有一种合并方式。

这两种方式里，我更偏向先 fetch 再合并，尤其是不太清楚远程改了什么的时候。中间能停下来看看新增提交，操作起来心里比较有数。如果团队已经约定好 pull 的配置，直接 pull 也方便。
