---
id: shiguang-normal-mobile-adaptation
title: 移动端适配
aliases: [能讲讲项目中的商城的移动端适配方案吗？, 关于商城的移动端适配方案，能结合当前项目解释一下吗？]
category: shiguang
difficulty: 基础
priority: normal
projects: [拾光集移动商城系统]
keywords: [rem, PostCSS, 根字号]
---

# 移动端适配

## 核心回答

我这里是用 rem 配合动态根字号做的。设计稿宽度是 750px，我把一整页按 10rem 来算，所以 PostCSS 转换样式时，用的是 75px 对应 1rem。

真正打开页面的时候，根字号会按显示宽度除以 10 来设置。比如手机宽 375px，根字号就是 37.5px，整个页面的 10rem 就正好是 375px。现在最大显示宽度也限制在 375px，电脑上打开就居中，不会一直放大。

【固定的底部导航和购买弹层也要跟中间的页面对齐，不能只改内容区域。这里比较容易混的是，75 是设计稿的换算基准，37.5 才是当前最大宽度下实际使用的根字号。】

## 回答要点

- 我这里是用 rem 配合动态根字号做的。设计稿宽度是 750px，我把一整页按 10rem 来算，所以 PostCSS 转换样式时，用的是 75px 对应 1rem。
- 真正打开页面的时候，根字号会按显示宽度除以 10 来设置。
- 固定的底部导航和购买弹层也要跟中间的页面对齐，不能只改内容区域。

## 面试官可能追问

- 320px 屏幕下根字号和容器宽度分别是多少？
- 固定底栏和购买弹层为什么要单独检查对齐？

## 代码证据

> **代码依据（不用于口述）**
> - [main.ts 第 1～15 行](/Users/aaron/personal-hub/apps/project-2/src/main.ts:1)：加载全局样式、rem 脚本和图片懒加载。
> - [rem.ts 第 1～23 行](/Users/aaron/personal-hub/apps/project-2/src/utils/rem.ts:1)：按视口宽度计算根字号，并限制最大宽度为 375px。
> - [Vite 配置第 49～63 行](/Users/aaron/personal-hub/apps/project-2/vite.config.ts:49)：PostCSS 的 px 转 rem 配置。
> - [main.css 第 1～30 行](/Users/aaron/personal-hub/apps/project-2/src/assets/main.css:1)：10rem 页面容器和固定元素居中。
> - [Tabbar 第 45～54 行](/Users/aaron/personal-hub/apps/project-2/src/components/Tabbar.vue:45)：底部导航栏对齐手机容器。
> - [商品详情第 809～815 行](/Users/aaron/personal-hub/apps/project-2/src/views/ProdInfo.vue:809)：购买弹层的最大宽度和居中方式。
