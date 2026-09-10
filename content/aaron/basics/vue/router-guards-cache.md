---
id: aaron-basic-vue-router-guards-cache
title: Vue Router、两种路由模式、路由守卫和 keep-alive
aliases: [请讲讲：Vue Router、两种路由模式、路由守卫和 keep-alive, 关于“Vue Router、两种路由模式、路由守卫和 keep-alive”，你会怎样回答？]
category: vue
difficulty: 进阶
priority: normal
projects: []
keywords: [VueRouter, 路由守卫, keep-alive, history]
---

# Vue Router、两种路由模式、路由守卫和 keep-alive

## 核心回答

Vue Router 是用来管理页面地址和组件之间对应关系的。$route 保存当前路由信息，比如 path、params、query、hash、name、matched；$router 是路由实例，用它的 push、replace、go 等方法控制跳转。

浏览器端常见的是 hash 和 history。hash 把前端路径放在 # 后面，这一段不会发送给服务端，部署相对简单。history 用浏览器 History API 改地址，URL 更自然，但直接访问或刷新 /detail 这样的路径时，服务端要能返回应用入口，否则可能 404。回退也要区分接口、真实静态文件和前端页面，不能所有请求都返回 HTML。

路由守卫可以在跳转前检查登录、在离开前提示表单未保存。全局有 beforeEach、beforeResolve 和 afterEach，路由独享有 beforeEnter，组件内有 beforeRouteEnter、beforeRouteUpdate、beforeRouteLeave。to 和 from 是目标和来源路由，旧式 next 用来继续、取消或重定向，而且一条逻辑分支要正确结束，避免重复调用。afterEach 是跳转后的处理，不能用它拦截导航。

keep-alive 解决的是组件缓存。页面切换出去时保留实例和状态，再回来不用重新创建，但仍然可能更新。include、exclude 按组件名称筛选，max 可以限制缓存数量；首次仍会创建和挂载，后续激活、停用主要看 activated 和 deactivated。我会用它保留需要返回恢复的列表状态，而不是把所有页面都一直缓存。

【beforeRouteEnter 执行时新组件实例还没创建，不能直接访问 this，可以在适用的 next 回调中拿实例。Vue Router 4 常用返回值控制导航；无浏览器环境还有内存路由，Vue Router 3 对应的是 abstract 模式。】
