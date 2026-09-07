---
id: lidi-202609-import-02-javascript-error-handling-q01
title: catch 之后还能继续执行吗？
aliases: []
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [错误处理, Promise, try catch, 兜底]
---

# catch 之后还能继续执行吗？

## 核心回答

可以。catch 会返回一个新的 Promise，里面返回值会让后面的 then 继续走成功分支；如果 catch 里再次 throw，错误就继续向后传。是否恢复要看业务，不能为了让页面不报错就返回一个假成功。
