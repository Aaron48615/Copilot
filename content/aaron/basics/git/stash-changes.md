---
id: aaron-basic-git-stash-changes
title: 代码没写完要切换任务，git stash 怎么用？
aliases: [git stash 保存的是什么，怎么恢复？, stash pop 和 stash apply 有什么区别？]
category: git
difficulty: 基础
priority: normal
projects: []
keywords: [git stash, 未提交修改, stash pop, stash apply, 未跟踪文件]
---

# 代码没写完要切换任务，git stash 怎么用？

## 核心回答

比如一个功能写到一半，临时要切去处理别的问题，我又不想把半成品随便提交，就可以先用 git stash 把这部分未提交修改收起来。它保存的是修改，不是把已经提交的记录丢掉。

我比较喜欢给 stash 带一句说明，比如 git stash push -m "登录页写到一半"，后面用 git stash list 就能认出来，不用挨个猜。如果新建的文件还没被 Git 跟踪，默认不会一起保存，需要时加 -u。

回来后可以用 git stash pop 恢复，成功后会把这条 stash 移除；git stash apply 则恢复后还保留记录。如果恢复时发生冲突，就先处理冲突，pop 也不会因为冲突就把那条记录直接删掉。它比较适合这种临时打断的情况。放了很多份、又隔了很久，反而容易忘了哪份是要继续写的。
