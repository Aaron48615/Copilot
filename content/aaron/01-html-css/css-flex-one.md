---
id: css-flex-one
title: flex:1 是哪些属性的复合属性？
aliases: [flex属性, flex-grow, flex-shrink, flex-basis, flex等分]
category: html-css
difficulty: 高频
priority: high
projects: []
keywords: [flex, flex-grow, flex-shrink, flex-basis]
---

# flex:1 是哪些属性的复合属性？

## 核心回答

flex 是 flex-grow、flex-shrink 和 flex-basis 的缩写。浏览器通常把 flex: 1 展开成 1 1 0%，意思是允许放大、允许缩小，分配空间时以 0% 为基础。

flex: auto 对应 1 1 auto，会先考虑项目原本的尺寸，再分配剩余空间。所以几项内容长短不同，用 flex: auto 不一定等宽。

## 追问：flex: 1 为什么有时也没能等宽？

还要看最小尺寸、padding、border 和容器尺寸。Flex 子项默认可能不愿意缩到内容最小宽度以下，长文本就会把布局撑开。横向布局常用 min-width: 0 配合文本省略。0% 在主轴尺寸不确定时也不一定和 0 表现相同。
