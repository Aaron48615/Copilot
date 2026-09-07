---
id: lidi-202609-import-03-frameworks-vue-vue-route-vs-router
title: $route 和 $router 有什么区别？
aliases: [route router区别, useRoute useRouter, query params]
category: current-interview
difficulty: 基础
priority: high
projects: []
keywords: [$route, $router, useRoute, useRouter, query, params]
---

# $route 和 $router 有什么区别？

## 核心回答

$route 是当前路由的信息对象，path、query、params、meta、fullPath 都在上面，只读；$router 是路由器实例，跳转方法都在上面：push、replace、go、back。一个回答"我现在在哪"，一个负责"我要去哪"。

Vue3 组合式里没有 this，对应换成 useRoute() 和 useRouter()：取参数用 route.query.xxx 或 route.params.xxx，编程式跳转用 router.push。

顺带说 query 和 params 的区别：query 是 URL 问号后面的参数，刷新页面还在；params 配合动态路由 /detail/:id 用，路径里没有 id 刷新就丢了。还有一个相关的坑：详情页之间互相跳，比如 /detail/1 到 /detail/2，复用同一个组件，组件不会重建，得 watch route.params 变化或者用 beforeRouteUpdate 重新拉数据。

