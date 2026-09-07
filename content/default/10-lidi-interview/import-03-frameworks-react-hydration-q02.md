---
id: lidi-202609-import-03-frameworks-react-hydration-q02
title: 客户端数据请求放哪里？
aliases: []
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [SSR, hydration, hydration mismatch, React]
---

# 客户端数据请求放哪里？

## 核心回答

能在服务端拿到且适合首屏的数据，优先随 HTML 或框架数据协议下发，减少客户端重复请求；用户交互后的数据在客户端请求。无论放哪一侧，都要处理加载、失败和权限变化，不能因为 SSR 首屏有数据就假设后续永远成功。

