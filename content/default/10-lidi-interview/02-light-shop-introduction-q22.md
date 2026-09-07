---
id: lidi-202609-product-v-html
title: 商品详情使用 v-html 有什么风险？
aliases: [v-html安全, 商品富文本, XSS]
category: current-interview
difficulty: 进阶
priority: high
projects: [轻购]
keywords: [v-html, XSS, 商品描述, 富文本清洗]
---

# 商品详情使用 v-html 有什么风险？

## 核心回答

1. 商品详情里的 `product.content` 是后端返回的富文本，页面用 `v-html` 展示图片和商品介绍。这样能保留图片、段落和原来的 HTML 样式。
2. 风险是 `v-html` 不会自动把所有 HTML 当成安全内容。如果后端内容没有清洗，里面可能出现脚本、事件属性或恶意链接，造成 XSS。
3. 当前项目的前提是商品详情内容来自可信的商城后台，但我不会把这个前提当成完整安全方案。正式项目应该在服务端白名单清洗，前端也可以使用成熟 sanitizer 再渲染。
4. 商品图片还要设置最大宽度和自动高度，避免富文本里的大图撑破移动端页面；链接、图片来源和外部资源也要按安全策略限制。
5. 如果不需要复杂富文本，优先用普通文本插值；只有确认内容经过清洗并且确实需要 HTML 展示时才使用 `v-html`。

