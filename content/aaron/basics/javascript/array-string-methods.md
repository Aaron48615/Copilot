---
id: aaron-basic-javascript-array-string-methods
title: 数组和字符串有哪些常用方法
aliases: [请讲讲：数组和字符串有哪些常用方法, 关于“数组和字符串有哪些常用方法”，你会怎样回答？]
category: javascript
difficulty: 基础
priority: normal
projects: []
keywords: [数组方法, 字符串方法, slice, splice]
---

# 数组和字符串有哪些常用方法

## 核心回答

数组方法我会按用途来记。增删用 push、pop、unshift、shift，分别处理末尾和开头，添加方法返回新长度，删除方法返回被删的元素。截取用 slice，不改原数组；splice 可以删、插入或替换，会改原数组并返回被删除项。concat 用来合并数组，join 把数组连接成字符串；sort 和 reverse 会改原数组，数字升序通常给 sort 传 (a, b) => a - b。

字符串不能原地修改。常用 indexOf、lastIndexOf 查位置，slice、substring 截取，replace 替换，trim 去掉两端空白，toLowerCase 和 toUpperCase 转大小写，split 拆成数组；concat 拼接，search 和 match 处理正则查找，localeCompare 比较字符串。

【slice 的结束位置不包含在结果里，负数从末尾算；substring 会把负数当作 0，必要时交换起止位置。substr 是历史方法，第二个参数表示长度。charAt 取字符位置对应的 UTF-16 码元，charCodeAt 和 String.fromCharCode 读写 UTF-16 码元，不是只能处理 ASCII；完整 Unicode 码点可以看 codePointAt、String.fromCodePoint。replace 对普通字符串默认只替换第一处，匹配结果是否包含分组要看正则标志；找不到时 indexOf、search 返回 -1，match 返回 null。数组求和直接用 reduce，不需要 eval。】
