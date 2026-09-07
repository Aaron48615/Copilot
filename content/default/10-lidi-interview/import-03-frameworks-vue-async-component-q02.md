---
id: lidi-202609-import-03-frameworks-vue-async-component-q02
title: 异步组件失败怎么办？
aliases: []
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [异步组件, keep-alive, defineAsyncComponent, 缓存]
---

# 异步组件失败怎么办？

## 核心回答

可以配置 loadingComponent、errorComponent 和超时，路由层还可以提供刷新或返回入口。发布后旧 chunk 不存在时，要和部署的静态资源保留策略一起考虑。

