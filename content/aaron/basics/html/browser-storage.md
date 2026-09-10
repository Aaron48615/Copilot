---
id: aaron-basic-html-browser-storage
title: localStorage、sessionStorage 和 Cookie 的区别
aliases: [请讲讲：localStorage、sessionStorage 和 Cookie 的区别, 关于“localStorage、sessionStorage 和 Cookie 的区别”，你会怎样回答？]
category: html
difficulty: 基础
priority: normal
projects: []
keywords: [localStorage, sessionStorage, Cookie]
---

# localStorage、sessionStorage 和 Cookie 的区别

## 核心回答

首先，这三者都是保存在浏览器的，也都受同源策略影响。

先说一下cookie，他是在符合条件的HTTP请求中自动携带的，大小一般不超过4KB，cookie是可以创建过期时间的，创建时设置了Expires属性的话，就是一个持久化cookie，直到过期时间才过期，没有设置Expires属性的话，就是会话级cookie，关闭浏览器窗口就删除。Cookie一般是用来保存登录信息的比较多，不过存多了也会带来请求问题

localStorage只在浏览器中保存，不发送到服务器，大小比cookie大，大约5MB或更大，如果不手动删除，就一直保存。

sessionStorage也只在浏览器中保存，大小也是5MB以上，但他是当前窗口有效的，窗口关闭，会话结束了就删除。
