---
id: aaron-basic-html-character-encoding
title: 页面乱码怎么排查
aliases: [请讲讲：页面乱码怎么排查, 关于“页面乱码怎么排查”，你会怎样回答？]
category: html
difficulty: 基础
priority: normal
projects: []
keywords: [字符编码, UTF-8, charset]
---

# 页面乱码怎么排查

## 核心回答

乱码可能是编码格式不匹配，和网页编码错误导致的。首先检查一下源文件实际保存的编码，优先统一为UTF-8。然后在HTML中声明字符集`<meta charset=’UTF-8’>`。之后再检查一下服务端Content-Type响应头中的charset是否与文件一致。

如果页面还是有像空白或方框这样的乱码的话，就要考虑是不是字体缺失了，缺失时要提供可用的代替字体作为回退方案。
