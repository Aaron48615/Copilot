---
id: lidi-202609-project-architecture
title: 轻购项目的目录和页面是怎么拆的？
aliases: [项目目录, 前端项目结构, views api utils ai]
category: current-interview
difficulty: 高频
priority: high
projects: [轻购]
keywords: [Vue3, script setup, views, api, ai, utils, components]
---

# 轻购项目的目录和页面是怎么拆的？

## 核心回答

1. `src/views` 放页面级组件，比如首页、分类、搜索、商品详情、购物车、订单确认、订单列表、地址、登录注册和轻购AI。页面主要负责把业务流程串起来。
2. `src/api` 按业务拆接口，比如首页、搜索、商品、购物车、订单、地址和轻购AI。这样页面里调用的是 `getProductDetail`、`getCartInfo` 这种有业务含义的函数，不需要到处写接口地址。
3. `src/ai` 放搜索联想和商品卖点这两条 AI 逻辑，里面有提示词、请求、结果解析、缓存和本地降级；轻购AI页面的推荐接口则单独放在 `src/api/guide.ts`。
4. `src/utils/request.ts` 负责 Axios 实例、Token 请求头、登录失效和基础请求方法；`token.ts` 只处理 Token 的读写；`deploymentRecovery.ts` 处理动态路由模块加载失败后的恢复。
5. `src/components` 放可以复用的界面组件，例如底部 Tab、加载骨架屏、商品详情里的 SKU 操作面板和打开轻购AI的按钮。这样页面不会把所有细节都堆在一个文件里。
6. 我现在的拆分是按业务职责来分，不是为了目录看起来复杂。面试里我会重点讲一个页面如何从 view 走到 api，再走到状态更新和页面反馈。

