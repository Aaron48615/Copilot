---
id: aaron-basic-git-branch-workflow
title: 开发一个新功能时，Git 分支怎么用？
aliases: [怎么创建功能分支并合并代码？, git merge 的合并方向怎么判断？]
category: git
difficulty: 基础
priority: high
projects: []
keywords: [功能分支, git switch, git merge, 分支合并]
---

# 开发一个新功能时，Git 分支怎么用？

## 核心回答

做新功能时，我更喜欢单独开一个分支，修改范围比较清楚。开始前确认当前分支和未提交修改，再从更新好的目标分支创建，比如用 git switch -c feature/login。这样登录功能还没写完时，就不会和别的修改混在一起。

写完以后先检查功能，再提交。合并时我主要记住一个方向：想合到哪个分支，就先切到哪个分支。比如要把 feature/login 合到 main，就在 main 上执行 git merge feature/login。这一步只发生在本地，不会自动把远程也更新了。

如果团队要求走 PR，就先把功能分支推上去，再让其他人看修改、按流程合并。一个分支围绕一件事来做，后面查问题或者回退也好找一些。分支名和能不能直接推 main，还是看仓库自己的约定。
