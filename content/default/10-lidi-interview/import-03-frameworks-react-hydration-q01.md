---
id: lidi-202609-import-03-frameworks-react-hydration-q01
title: 为什么不能到处 suppressHydrationWarning？
aliases: []
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [SSR, hydration, hydration mismatch, React]
---

# 为什么不能到处 suppressHydrationWarning？

## 核心回答

它只是压掉提示，不会自动修复结构或事件不一致。滥用后，真正的 SSR bug 变得很难发现。应该先找出非确定性来源，统一时间和随机数，保证服务端与客户端使用同一份初始数据，再把不可避免的动态区域限制在很小范围。

