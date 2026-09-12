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

### MVC 和 MVVM（架构补充）

MVC/MVVM 是职责分离的架构模式，不是性能优化手段。一个好架构可以提高可维护性，但性能仍要靠具体实现和测量。

#### MVC 是什么

- **Model**：业务数据与业务规则。
- **View**：向用户展示内容。
- **Controller**：处理输入，协调 Model 和 View。

MVC 的核心收益是降低界面、输入处理和业务逻辑的耦合，便于测试、维护和替换。

#### MVVM 是什么

- **Model**：业务数据与规则。
- **View**：声明式 UI。
- **ViewModel**：为 View 提供可观测状态和交互逻辑，屏蔽具体 View 操作。

MVVM 常通过数据绑定或响应式系统让 View 随状态更新，减少手动操作 DOM 和同步界面的样板代码。

#### 为什么有了 MVC 还会用 MVVM

MVC 中 Controller 在复杂 UI 项目里可能同时处理大量交互、状态同步和 View 更新，逐渐膨胀。MVVM 将界面状态和交互映射放进 ViewModel，再由响应式机制同步 View，更适合状态驱动的现代前端 UI。

> [!warning]
> Vue 或其他框架可以借鉴 MVVM 思想，但不必把框架每个部分硬对应到经典 MVVM。面试时说“类 MVVM/借鉴 MVVM”往往更严谨。
