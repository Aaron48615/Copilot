---
id: lidi-202609-import-03-frameworks-react-hydration
title: SSR hydration 不一致通常是怎么造成的？
aliases: [hydration mismatch, SSR 水合, React SSR]
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [SSR, hydration, hydration mismatch, React]
---

# SSR hydration 不一致通常是怎么造成的？

## 核心回答

服务端先生成 HTML，客户端第一次 render 必须产出同样的结构，React 才能把事件和状态接上。时间、随机数、浏览器宽度、用户存储和只在客户端存在的数据，如果直接参与首屏 render，就可能出现 mismatch。我的处理方式是让首屏使用稳定输入，客户端挂载后再读取浏览器信息；确实只在客户端存在的局部，才用明确的 suppress 或客户端边界，并记录它的影响。

