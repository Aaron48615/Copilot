---
id: aaron-basic-vue-mvvm-mvc
title: MVVM 和 MVC 有什么区别
aliases: [请讲讲：MVVM 和 MVC 有什么区别, 关于“MVVM 和 MVC 有什么区别”，你会怎样回答？]
category: vue
difficulty: 基础
priority: normal
projects: []
keywords: [MVVM, MVC, ViewModel]
---

# MVVM 和 MVC 有什么区别

## 核心回答

MVC 是 Model、View、Controller，分别负责数据、界面和协调用户操作。用户操作交给控制器，控制器更新模型，再安排界面的变化。MVVM 则把中间这一层换成 ViewModel，通过绑定把数据和界面关联起来，减少手动同步 DOM 的代码。

比如表单输入，MVVM 里可以通过绑定让输入更新状态，状态变化又反映到页面，我就能把注意力更多放在数据逻辑上。Vue 常被用来解释这种思路，但一个完整项目还会有接口、路由和业务层，不能把所有代码都塞进组件里。

我觉得它们主要是分工方式不同，维护起来好不好还要看实际划分，不能直接说 MVC 一定臃肿、MVVM 一定更好。
