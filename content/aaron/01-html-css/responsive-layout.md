---
id: css-responsive-mobile
title: 移动端适配是怎么做的？
aliases: [移动端适配方案, rem vw, 响应式布局, 移动端h5适配]
category: html-css
difficulty: 高频
priority: high
projects: []
keywords: [viewport, rem, vw, Vant, 1px, 安全区]
---

# 移动端适配是怎么做的？

## 核心回答

先设置 viewport，让页面按设备宽度布局。页面结构可以用 Flex、Grid 和媒体查询调整，尺寸按需要选 rem、vw 或固定像素。rem 相对根字号，vw 相对视口宽度；不必把所有尺寸都等比例缩放，比如按钮需要保留合适的点击区域。

还要检查图片比例、文字换行和底部安全区。图片提前留好宽高比，加载时页面就不容易跳动。

## 追问：怎样验证适配效果？

用不同宽度检查布局，再用真机操作。除了是否溢出，还要看软键盘弹出后的输入区域、长文本、横竖屏和固定底栏是否正常。开发者工具能帮助定位，但不能完全代替实际设备。
