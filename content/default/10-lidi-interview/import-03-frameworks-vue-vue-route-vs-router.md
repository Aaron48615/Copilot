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

1. route 表达当前路由的位置和信息，包括 path、params、query、meta 等；router 是负责导航和路由管理的实例，提供 push、replace、back 等能力。选项式常见 this.$route 与 this.$router，组合式则通过 useRoute 和 useRouter 获取，不需要组件 this。

2. 我会用 route 读取当前商品编号，用 router 发起跳转，不能直接给 route.params 赋值期待地址和页面正确切换。位置状态应通过导航 API 更新，必要时构造目标路径、查询条件和历史方式，让 URL 与组件状态保持一致。

3. params 通常对应已声明的动态路径段，例如详情路径中的 id；query 是问号后的查询参数，适合筛选和页码。二者如果都编码在 URL 中都能随刷新恢复，不能说 params 天然刷新就丢；未声明、未编码的额外参数也不能当可靠存储。

4. 从同一路由记录的商品甲跳到商品乙，组件可能复用，不会重新执行完整挂载。应监听具体的 route.params.id，或使用路由更新守卫重新获取数据，同时处理旧请求回写；不宜深度监听整个 route，让无关的查询变化也触发详情请求。

5. URL 输入需要校验和规范化，例如页码可能为空、重复或不是数字，query 也可能有数组形态。导航失败与权限变化要有反馈；push 增加历史记录，replace 替换当前记录，应根据用户后退预期选择，不能把所有跳转都当作同一种赋值操作。

## 追问：传了 path 和 params，为什么参数没按预期拼进去？

1. 使用明确 path 时，路由器不会把任意 params 自动拼进这个字符串，相关版本文档也要求区分命名路由参数生成和手写路径。若希望根据动态参数构造路径，可以使用已声明的命名路由并提供对应 params。

2. 自己构造路径时要负责参数编码和合法性，不能把带斜杠或特殊字符的用户输入直接拼接。query 则作为查询条件处理，不应把大对象、敏感资料或需要可靠保存的草稿全部塞进 URL 参数。

3. 我会验证生成的 href、实际导航结果和直接刷新，确认地址本身确实包含恢复页面所需的信息。仅在当前内存环境跳转成功，不能证明分享给另一浏览器或刷新后也能打开同一个对象。

## 追问：为什么监听 route.params.id 比监听整个 route 更合适？

1. 详情请求如果只由 id 决定，监听具体字段能让触发条件明确。整个 route 还包含查询、hash 等信息，用户只改变页内锚点或展示选项也可能导致回调执行，产生没有必要的重查和加载闪动。

2. 可以用 getter 作为监听源，并按需要立即获取初始详情。路由从一个 id 切到另一个 id 时，旧请求要取消或失效，新结果只用于当前编号；缩小监听范围减少误触发，但不会自动解决响应乱序。

3. 如果语言或租户等其他路由信息同样影响详情，就应把它们明确列为来源，不能为减少请求漏掉真实依赖。目标是让监听与查询语义一致，而不是越少字段越好，测试需要覆盖每个会改变请求结果的参数。
