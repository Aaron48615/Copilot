---
id: lidi-202609-light-shop-introduction
title: 请详细介绍一下轻购项目
aliases: [轻购项目, 移动端电商项目, Vue3 电商项目, 轻购用了哪些技术]
category: current-interview
difficulty: 必问
priority: high
projects: [轻购]
keywords: [轻购, Vue3, TypeScript, Vant, 移动端, 电商]
---

# 请详细介绍一下轻购项目

## 核心回答

1. 轻购是一个移动端电商 Web 应用，技术栈是 Vue 3、TypeScript、Vue Router、Vant、Axios、SCSS、Vite 和 `amfe-flexible`。页面通过路由拆成首页、分类、搜索、商品详情、购物车、订单、地址、登录和轻购AI等页面。
2. 用户可以注册登录、浏览和搜索商品、查看热搜和搜索历史、进入详情页选择 SKU、收藏商品、加入购物车或立即购买，再选择地址、确认订单、调用支付接口，并在订单列表里付款或确认收货。
3. 轻购AI是我重点做的功能。用户用自然语言输入需求，前端调用 `/guide/recommend`，返回结果里有 `intent`、`recommendations`、`matched`、`unmatched` 和 `relaxedConstraints`，我按这些结构分别展示，让用户知道推荐依据和不确定的地方。
4. 搜索页还有独立的 AI 搜索联想链路：输入后等待 300 毫秒，再调用 AI；请求变化时取消旧请求，并用请求编号防止旧结果覆盖新结果；AI 失败或格式不对时改用本地推荐。
5. 商品详情页还会根据商品名称、价格和简介请求 AI 卖点。接口失败时使用本地分类卖点或通用卖点，所以 AI 是增强功能，不能让它影响普通商品详情和购物流程。
6. 这个项目最适合展开的地方，是一个完整电商流程里如何接入 AI，同时保证 AI 出错时基础功能仍然能用。
