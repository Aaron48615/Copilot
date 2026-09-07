---
id: lidi-202609-git-collaboration-q02
title: 遇到 Git 冲突怎么处理？
aliases: []
category: current-interview
difficulty: 高频
priority: high
projects: []
keywords: [Git, branch, merge, rebase, revert, reset, conflict, commit]
---

# 遇到 Git 冲突怎么处理？

## 核心回答

1. 先查看冲突文件和冲突上下文，理解当前分支和目标分支分别修改了什么。
2. 结合功能逻辑手动保留正确内容，处理完标记为已解决，再继续 merge 或 rebase。
3. 处理冲突后运行项目、类型检查和相关测试，尤其要检查页面行为，而不是只看 Git 没有冲突了。
4. 如果不确定某段业务应该保留哪种逻辑，我会和修改这部分的人确认，不会只按文件最后一版覆盖。

