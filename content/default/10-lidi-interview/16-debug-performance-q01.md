---
id: lidi-202609-debug-performance-q01
title: 页面白屏的具体排查顺序是什么？
aliases: []
category: current-interview
difficulty: 高频
priority: high
projects: []
keywords: [Console, Sources, Network, Performance, Lighthouse, 兼容性, 首屏]
---

# 页面白屏的具体排查顺序是什么？

## 核心回答

1. 先看浏览器 Console，判断是语法错误、运行时异常、模块加载失败还是权限问题。
2. 再看入口资源和 chunk 是否加载成功。部署后如果 HTML 和 JS 版本不一致，旧页面可能引用已经不存在的 chunk。
3. 如果资源正常，再检查路由配置、组件导入和接口数据。某个组件直接读取不存在的字段，也可能在渲染时抛错。
4. 最后确认是否有全局错误边界或兜底页面，至少给用户一个可重试的反馈，不要让整个页面什么都不显示。

