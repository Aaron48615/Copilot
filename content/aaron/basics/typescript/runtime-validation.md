---
id: aaron-basic-typescript-runtime-validation
title: 用了 TypeScript，为什么还要校验接口数据？
aliases: [给接口写类型就能保证返回值正确吗？, 类型断言能检查服务端数据吗？]
category: typescript
difficulty: 基础
priority: normal
projects: []
keywords: [TypeScript, 运行时校验, 类型断言, 外部数据]
---

# 用了 TypeScript，为什么还要校验接口数据？

## 核心回答

因为 TypeScript 主要在写代码和检查代码时起作用，真实接口返回的内容是在运行时才拿到的。比如声明里 name 是字符串，服务器却传了 null，写类型不会把 null 自动变成字符串。

用 as 把结果断言成某个类型也一样，它只是让我告诉编译器“按这个类型看”，没有真正检查内容。关键字段是不是存在、类型对不对，还是要实际判断。我更喜欢把检查放在数据交给页面之前，后面显示和操作时就少一些猜测。规则少可以手动判断，结构复杂时再考虑校验库。

校验失败以后也要看字段重要不重要。头像没传可以用默认图，关键 ID 不对就应该停止后续操作。类型检查帮着发现代码里的不匹配，运行时校验再确认真正拿到的数据，两边各有用处。
