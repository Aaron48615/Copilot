---
id: lidi-202609-project-lazy-route
title: 轻购为什么使用路由懒加载？部署后动态模块加载失败怎么办？
aliases: [路由懒加载, 动态 import, vite preload error, 分包]
category: current-interview
difficulty: 进阶
priority: high
projects: [轻购]
keywords: [Vue Router, dynamic import, Vite, 分包, 部署恢复]
---

# 轻购为什么使用路由懒加载？部署后动态模块加载失败怎么办？

## 核心回答

1. 路由表里除了布局和基础入口，首页、分类、购物车、订单、商品详情等页面都使用 `() => import(...)`。这样进入首页时不用一次性下载所有页面的 JavaScript。
2. Vite 构建时会把这些页面拆成不同的分包，用户访问某个页面时再加载对应模块，首屏资源会更小一些。
3. 分包有一个常见问题：新版本部署以后，用户页面里还缓存着旧入口，点击旧路由时可能找不到已经被替换的旧 chunk。
4. 项目里的 `deploymentRecovery` 监听 `vite:preloadError` 和 Router 的动态模块错误，判断是不是旧分包加载失败；如果是，就用 sessionStorage 记录一次恢复状态，并给 URL 加 `_app_reload` 刷新页面。
5. 它只允许同一个目标恢复一次，避免刷新死循环。路由成功进入以后，`afterEach` 会清理恢复标记。
6. 这解决的是前端部署后的恢复体验，不能代替正确的静态资源缓存策略。真正上线时还要让入口文件及时更新、旧 chunk 保留一段时间，并检查 CDN 缓存配置。

