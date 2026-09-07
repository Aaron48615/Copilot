---
id: lidi-202609-import-01-html-css-css-flex-one-q01
title: flex: 1 为什么有时也没能等宽？
aliases: []
category: current-interview
difficulty: 高频
priority: high
projects: []
keywords: [flex, flex-grow, flex-shrink, flex-basis]
---

# flex: 1 为什么有时也没能等宽？

## 核心回答

还要看最小尺寸、padding、border 和容器尺寸。Flex 子项默认可能不愿意缩到内容最小宽度以下，长文本就会把布局撑开。横向布局常用 min-width: 0 配合文本省略。0% 在主轴尺寸不确定时也不一定和 0 表现相同。

