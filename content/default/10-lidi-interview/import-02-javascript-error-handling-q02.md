---
id: lidi-202609-import-02-javascript-error-handling-q02
title: finally 适合放什么？
aliases: []
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [错误处理, Promise, try catch, 兜底]
---

# finally 适合放什么？

## 核心回答

适合放无论成功失败都要做的收尾，比如关闭 loading、释放锁、清理临时资源。它的返回值通常不会改变前面成功或失败的结果，但如果 finally 自己抛错，原来的结果会被新的错误覆盖，所以里面不要放可能失败的业务逻辑。
