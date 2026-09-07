---
id: lidi-202609-import-08-coding-debounce-q01
title: 为什么要保存 this 和参数？
aliases: []
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [debounce, 防抖, cancel, flush]
---

# 为什么要保存 this 和参数？

## 核心回答

因为真正执行发生在稍后的定时器回调里，回调自己的 this 和参数已经不是调用包装函数时的那一份。保存并在执行时用 `apply` 还原，才能让它既适用于普通函数，也适用于方法调用。执行完要清空引用，避免长时间持有大对象。

