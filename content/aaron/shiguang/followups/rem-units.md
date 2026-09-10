---
id: shiguang-followup-rem-units
title: 追问：为什么使用 rem，不直接使用 vw 或 px？750、75、375 和 10rem 是什么关系？
aliases: [能讲讲项目中的rem 方案与设计稿换算关系吗？, 关于rem 方案与设计稿换算关系，能结合当前项目解释一下吗？]
category: shiguang
difficulty: 基础
priority: normal
projects: [拾光集移动商城系统]
keywords: [追问, rem, 根字号, PostCSS]
---

# 追问：为什么使用 rem，不直接使用 vw 或 px？750、75、375 和 10rem 是什么关系？

## 核心回答

设计稿是 750px，样式按设计稿写 px，PostCSS 以 75 为基准转成 rem。运行时根字号是实际显示宽度除以 10，比如 320px 就是 32px，10rem 正好铺满；宽度最多取 375px，所以电脑上根字号最大是 37.5px，页面保持 375px 居中。

我用 rem 主要是方便沿用设计稿的换算。固定 px 不会跟着屏幕等比例变化，vw 配合限宽也能做，没有说 rem 一定更好。

【业务 CSS 直接写 `max-width: 375px` 会被转成 5rem，再按 37.5px 算就只有 187.5px，所以容器直接写 10rem。固定底栏要单独居中，购买弹层则用左右边界和自动外边距，避免改 transform 覆盖 Vant 动画。】

## 回答要点

- 设计稿是 750px，样式按设计稿写 px，PostCSS 以 75 为基准转成 rem。
- 我用 rem 主要是方便沿用设计稿的换算。固定 px 不会跟着屏幕等比例变化，vw 配合限宽也能做，没有说 rem 一定更好。
- 业务 CSS 直接写 `max-width: 375px` 会被转成 5rem，再按 37.5px 算就只有 187.5px，所以容器直接写 10rem。

## 面试官可能追问

- 运行时根字号为什么不是一直固定为 75px？
- 如果采用 vw，桌面限宽还需要考虑什么？

## 代码证据

> **代码依据（不用于口述）**
> - [rem.ts 第 1～23 行](/Users/aaron/personal-hub/apps/project-2/src/utils/rem.ts:1)：750、75、375 和根字号计算。
> - [Vite 配置第 49～63 行](/Users/aaron/personal-hub/apps/project-2/vite.config.ts:49)：pxtorem 基准和 node_modules 排除规则。
> - [main.css 第 1～30 行](/Users/aaron/personal-hub/apps/project-2/src/assets/main.css:1)：10rem 容器和固定元素居中。
> - [Tabbar 第 45～54 行](/Users/aaron/personal-hub/apps/project-2/src/components/Tabbar.vue:45)：底部导航栏对齐手机容器。
> - [商品详情第 809～815 行](/Users/aaron/personal-hub/apps/project-2/src/views/ProdInfo.vue:809)：购买弹层保留原 transform 的居中方式。
