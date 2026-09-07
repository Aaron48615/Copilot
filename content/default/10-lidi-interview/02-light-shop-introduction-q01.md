---
id: lidi-202609-light-shop-introduction-q01
title: 为什么选择 Vue 3、TypeScript 和 Vant？
aliases: []
category: current-interview
difficulty: 必问
priority: high
projects: [轻购]
keywords: [轻购, Vue3, TypeScript, Vant, 移动端, 电商]
---

# 为什么选择 Vue 3、TypeScript 和 Vant？

## 核心回答

1. 轻购是移动端项目，所以选择 Vant，是因为它已经提供了搜索框、导航栏、卡片、地址列表、步进器、弹窗、提交栏和 Toast 等移动端常用组件，我不用从零写每个基础交互。
2. Vue 3 的 `script setup` 和组合式 API 让我可以把一个页面的请求、状态和事件放在一起。比如搜索页的关键词、历史、热搜、AI 加载、防抖和取消请求逻辑比较容易顺着看。
3. TypeScript 主要用来约束数据结构。项目里我给首页商品、搜索结果、购物车项和轻购AI返回结果定义了类型；例如 `GuideResult` 明确了推荐商品、匹配条件和放宽条件。
4. Axios 负责普通接口，统一处理 baseURL、超时、Token 和登录失效；Vite 负责开发和构建，路由页面通过动态 `import` 按需加载。
5. 这套组合不是为了堆技术，而是移动端组件、Vue 的页面组织方式和 TypeScript 的数据约束比较适合这个项目的规模。
