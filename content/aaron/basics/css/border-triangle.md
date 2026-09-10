---
id: aaron-basic-css-border-triangle
title: CSS 怎么画三角形
aliases: [请讲讲：CSS 怎么画三角形, 关于“CSS 怎么画三角形”，你会怎样回答？]
category: css
difficulty: 基础
priority: normal
projects: []
keywords: [CSS三角形, border, 透明边框]
---

# CSS 怎么画三角形

## 核心回答

可以利用边框交界处的斜边，把元素的宽高都设成 0，再给四条边设置宽度。把其中三条边设成透明，只留一条有颜色，就能看到三角形。比如只保留下边框的颜色，得到的就是朝上的三角形。

```css
.triangle {
  width: 0;
  height: 0;
  border: 20px solid transparent;
  border-bottom-color: red;
}
```

这种写法适合小箭头、气泡尖角之类的简单装饰，边框宽度决定三角形的尺寸。
