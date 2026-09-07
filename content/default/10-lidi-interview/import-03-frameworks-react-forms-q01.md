---
id: lidi-202609-import-03-frameworks-react-forms-q01
title: 校验应该什么时候发生？
aliases: []
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [React, 表单, controlled, uncontrolled, 校验]
---

# 校验应该什么时候发生？

## 核心回答

必填和格式可以在 blur 或提交时校验，避免用户刚输入一个字符就被红字打断；密码强度或搜索联动可以按需即时反馈。服务端校验永远是最终边界，前端错误只帮助用户修正。提交状态要区分 idle、submitting、success 和 error，失败后保留输入并把焦点移到第一个错误。

