---
id: aaron-basic-css-flex-shorthand
title: flex: 1 是哪些属性的复合属性
aliases: [请讲讲：flex: 1 是哪些属性的复合属性, 关于“flex: 1 是哪些属性的复合属性”，你会怎样回答？]
category: css
difficulty: 基础
priority: high
projects: []
keywords: [flex-grow, flex-shrink, flex-basis]
---

# flex: 1 是哪些属性的复合属性

## 核心回答

flex总共能给三个值，第一个是flex-grow，定义项目的放大比例，0是有空间也不放大，数值越大，占用空间越大。

第二个是flex-shrink，定义项目的缩小比例，0是没有空间了也不缩小，数值越大，收缩得越多。

第三个是flex-basis，是项目分配多余空间之前，默认在主轴上的空间大小，也是计算放大缩小的基准值。假如有个300px的容器，里面有两个项目，一个项目有100px的基准值，另一个项目基准值是0，他们的放大比例都是1，那第一个项目会先占100px空间，剩下的200px空间他们两个再平分，一人100。最后就是前一个占200px，后一个占100px。

那么，flex为1，其实是flex: 1 1 0% 的缩写，放大缩小都是1，基准值为0。flex: auto是flex: 1 1 auto的缩写，基准值根据内容大小决定。flex: none是flex: 0 0 auto，不伸缩并保持内容大小。
