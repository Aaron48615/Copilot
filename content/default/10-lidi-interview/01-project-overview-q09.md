---
id: lidi-202609-project-mobile-adaptation
title: 轻购是移动端项目，页面适配是怎么做的？
aliases: [移动端适配, amfe-flexible, rem, 手机端布局]
category: current-interview
difficulty: 高频
priority: high
projects: [轻购]
keywords: [移动端, amfe-flexible, Vant, safe-area, rem]
---

# 轻购是移动端项目，页面适配是怎么做的？

## 核心回答

1. 项目入口引入了 `amfe-flexible`，配合 Vant 组件和相对尺寸，让页面可以根据移动端屏幕宽度缩放。样式里也会根据移动端设计使用相对单位和统一的字号。
2. 页面布局主要用弹性布局、网格和卡片，不把所有内容写死成一个固定宽度。商品列表、首页分组和分类页都让内容区域随着屏幕变化。
3. 底部 Tab、购物车提交栏和订单提交栏会留出底部空间，部分组件还使用 `safe-area-inset-bottom`，避免被 iPhone 的安全区域挡住。
4. 图片会设置宽度、比例和 `object-fit`，详情页的图片内容还限制最大宽度，避免后端 HTML 里的大图撑破屏幕。
5. 适配不只是把字体缩小，还要检查点击区域、横向溢出、底部固定元素、长商品名和空状态。我会用不同宽度的浏览器模拟移动设备，再看真实手机上的滚动和点击体验。

