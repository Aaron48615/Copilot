---
id: shiguang-normal-rem-conversion
title: 难点二：桌面上保持手机宽度时，不能让 rem 被换算两次
aliases: [能讲讲项目中的桌面限宽时的 rem 二次换算问题吗？, 关于桌面限宽时的 rem 二次换算问题，能结合当前项目解释一下吗？]
category: shiguang
difficulty: 进阶
priority: high
projects: [拾光集移动商城系统]
keywords: [难点, rem, PostCSS, 限宽]
---

# 难点二：桌面上保持手机宽度时，不能让 rem 被换算两次

## 核心回答

适配这里有个容易忽略的地方，就是 CSS 里的 px 还会被 PostCSS 转一次。假如为了限制电脑上的宽度，直接写 `max-width: 375px`，按 75 的基准就会转成 5rem；运行时根字号又是 37.5px，最后页面只有 187.5px 宽。

所以我直接把最大宽度写成 10rem，再让运行时按最多 375px 来算根字号，这样宽度才对。固定底栏和弹层也要跟内容区域用同一套宽度，不能只有页面中间是对的。

【底栏可以用水平位移居中，但购买弹层本身会用 transform 做动画，再覆盖它就可能影响开关效果，所以弹层用了左右边界和自动外边距。检查时我会看 320px、375px 和电脑宽屏，再实际开关弹层看有没有错位。】

## 回答要点

- 适配这里有个容易忽略的地方，就是 CSS 里的 px 还会被 PostCSS 转一次。
- 所以我直接把最大宽度写成 10rem，再让运行时按最多 375px 来算根字号，这样宽度才对。
- 底栏可以用水平位移居中，但购买弹层本身会用 transform 做动画，再覆盖它就可能影响开关效果，所以弹层用了左右边界和自动外边距。

## 面试官可能追问

- 375px 经两次换算为什么会变成 187.5px？
- 购买弹层为什么不直接覆盖 transform 来居中？

## 代码证据

> **代码依据（不用于口述）**
> - [rem.ts 第 9～15 行](/Users/aaron/personal-hub/apps/project-2/src/utils/rem.ts:9)：根字号公式和 375px 封顶。
> - [Vite 配置第 52～63 行](/Users/aaron/personal-hub/apps/project-2/vite.config.ts:52)：业务 CSS 按 75 把 px 转成 rem。
> - [main.css 第 1～30 行](/Users/aaron/personal-hub/apps/project-2/src/assets/main.css:1)：10rem 页面宽度和固定栏居中规则。
> - [Tabbar 第 45～54 行](/Users/aaron/personal-hub/apps/project-2/src/components/Tabbar.vue:45)：底部导航宽度和水平定位。
> - [商品详情第 809～815 行](/Users/aaron/personal-hub/apps/project-2/src/views/ProdInfo.vue:809)：购买弹层不覆盖原有 transform 的居中方式。
> - [index.html 第 11～27 行](/Users/aaron/personal-hub/apps/project-2/index.html:11)：JavaScript 执行前的初始根字号和容器样式。
