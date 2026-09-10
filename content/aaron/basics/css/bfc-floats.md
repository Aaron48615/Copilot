---
id: aaron-basic-css-bfc-floats
title: BFC 是什么，怎么触发，有哪些应用，怎么清除浮动
aliases: [请讲讲：BFC 是什么，怎么触发，有哪些应用，怎么清除浮动, 关于“BFC 是什么，怎么触发，有哪些应用，怎么清除浮动”，你会怎样回答？]
category: css
difficulty: 进阶
priority: high
projects: []
keywords: [BFC, 浮动, 外边距合并, flow-root]
---

# BFC 是什么，怎么触发，有哪些应用，怎么清除浮动

## 核心回答

BFC 是块级格式化上下文，我把它理解成一块有自己布局规则的区域。里面的普通块盒在通常的水平书写模式下从上到下排列，竖直间距由 margin 等决定；它和外面的浮动、外边距合并有一定隔离，但不是说里面怎么变化都绝对不会影响外面。

它有几个比较实用的特点：计算自身高度时会包含内部浮动元素，正常流中建立 BFC 的块盒，其边框盒不会和同一上下文里的外部浮动盒重叠，而且内部子元素的 margin 不会穿过 BFC 边界和外部合并。因此可以用它解决浮动导致父元素高度塌陷、父子外边距合并，也能让浮动旁边的内容形成独立的一栏，避免文字绕着浮动元素排列。两个相邻元素之间的 margin 合并，要让相关 margin 处在不同 BFC 中，不能给同一个父元素开 BFC 就认为所有合并都消失了。

触发方式除了根元素，还有 float 不为 none、absolute 或 fixed 定位、inline-block、table-cell、table-caption，以及 overflow: hidden、auto 或 scroll。专门为了创建 BFC 的话，display: flow-root 更直接，也不会为了布局顺便把内容裁掉。overflow: clip 本身不会建立 BFC。

清除浮动时，也可以在浮动内容后放一个 clear: both 的块，或者让父元素的 ::after 生成这个清除块。clear 是让这个块避开前面的浮动，不是给任意父元素写一句 clear 就能自动包住它自己的浮动子元素。

```css
.clearfix::after {
  content: "";
  display: block;
  clear: both;
}
```

【这些布局现在也可以直接用 Flex 或 Grid 实现。选择 BFC 还是 Flex，要看是修复已有浮动布局，还是在设计新的排列方式。】
