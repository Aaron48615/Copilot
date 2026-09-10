---
id: aaron-basic-git-resolve-conflicts
title: Git 出现冲突时，你会怎么处理？
aliases: [合并代码发生冲突怎么办？, pull 或 rebase 冲突后怎么继续？]
category: git
difficulty: 基础
priority: high
projects: []
keywords: [Git冲突, git status, 冲突标记, merge, rebase]
---

# Git 出现冲突时，你会怎么处理？

## 核心回答

冲突以后，可以用 git status 找到对应文件，再对照两边的修改。常见的冲突标记是 <<<<<<<、======= 和 >>>>>>>，编辑器一般也会把两边的内容分开展示。

我更喜欢对着两边的代码看清楚再改，直接点“全部保留当前”或者“两边都保留”，心里不太有底，因为拼到一起不一定能运行。得先看双方想实现什么，如果另一边的逻辑不清楚，就和修改的人确认一下，再整理出最终代码、删掉冲突标记。

改完会检查相关功能，再 git add 标记解决。普通 merge 冲突处理完可以 git commit；如果是在 rebase 中，就用 git rebase --continue，后面还可能遇到其他提交的冲突。暂时不想继续，就按当前操作用 git merge --abort 或 git rebase --abort。标记删干净了，还得确认两边原本要做的事情都处理对了。
