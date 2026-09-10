---
id: aaron-basic-css-transition-animation
title: transition 和 animation 有什么区别
aliases: [请讲讲：transition 和 animation 有什么区别, 关于“transition 和 animation 有什么区别”，你会怎样回答？]
category: css
difficulty: 基础
priority: normal
projects: []
keywords: [transition, animation, 关键帧]
---

# transition 和 animation 有什么区别

## 核心回答

这两个都能让样式随着时间变化，主要区别是怎么开始，以及能控制多少个变化阶段。transition 是某个属性值发生变化后，从原来的值过渡到新的值，比如鼠标移入按钮时，背景色慢慢变深。它不一定要靠鼠标事件触发，切换 class 或修改样式也可以。

animation 会配合 @keyframes 定义关键帧，除了起点和终点，还能设置中间的变化，也可以控制循环次数、播放方向和暂停。比如持续转动的加载图标，用 animation 就更合适。简单的状态切换我会先考虑 transition，需要多阶段或循环播放时再用 animation。

【transition 常用的四个属性是 property、duration、timing-function 和 delay，分别控制变化属性、持续时间、速度曲线和延迟。transform 本身只是平移、旋转、缩放等变换，需要配合前两者才会形成随时间变化的效果。】
