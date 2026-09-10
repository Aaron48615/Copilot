---
id: aaron-basic-css-stacking-context
title: z-index 为什么有时候不生效？
aliases: [z-index 写很大为什么还是被遮住？, 怎么排查元素的层叠顺序？]
category: css
difficulty: 进阶
priority: normal
projects: []
keywords: [z-index, 层叠上下文, transform, overflow]
---

# z-index 为什么有时候不生效？

## 核心回答

这个不一定是数字太小，得先看元素能不能通过 z-index 调整层级，比如普通静态定位的元素就不能直接靠它控制，不过 Flex、Grid 子项有例外。然后再看是不是被父元素的层叠上下文限制住了。

层叠上下文可以想成分组比较：一个组里的子元素先排好顺序，再把整个组拿去和旁边的组比较。所以父容器整体在下面，里面的弹窗数字写得再大，也不一定能盖住另一个组。transform、opacity 小于 1 等都可能建立这种上下文。

还有一种情况其实是被父级 overflow 裁掉了，不是层级太低。我觉得先把“被盖住”和“被裁掉”分清楚，排查会快很多。检查父级样式，必要时调整弹层挂载位置，比一直加 9 更有用。
