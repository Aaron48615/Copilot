---
id: lidi-202609-import-03-frameworks-vue-vue-script-setup
title: script setup 是干什么的？
aliases: [setup语法糖, defineProps, defineExpose, 自动注册]
category: current-interview
difficulty: 高频
priority: high
projects: []
keywords: [script setup, defineProps, defineEmits, defineExpose, 语法糖]
---

# script setup 是干什么的？

## 核心回答

1. `script setup` 是 Vue 单文件组件里用组合式 API 的编译期语法，把顶层逻辑收成组件的 `setup`，少写显式 `return` 和组件注册。顶层变量、函数、import 进来的组件，模板可以直接用。每个组件实例还是各自建状态，不是把所有内容变成模块单例。

2. `defineProps`、`defineEmits` 这些是编译器宏，声明输入和事件，不必当普通运行时函数去引入。参数有编译和提升规则，不能随便读后面才创建的局部状态。TypeScript 声明提供类型帮助，替不了所有运行时业务校验。

3. 组件默认不把内部绑定全公开给父级实例 `ref`，要用 `defineExpose` 露出必要能力，比如只公开 `focus` 和 `reset`，避免父级直接控制内部所有状态。模板能用内部变量，和父组件能访问组件实例，是两个范围。插槽和透传属性用 `useSlots`、`useAttrs` 拿。

4. 版本能力要分开：`defineOptions` 用来声明选项，比如 `keep-alive` 的 `include` 需要组件 `name`，Vue 3.3 之后可以直接声明；`defineModel` 从 Vue 3.4 简化模型通信；Vue 3.5 对特定 props 解构有响应式编译处理。最新示例不能直接套到旧编译环境。普通 `reactive` 解构也不会因为用了 `script setup` 就自动变成持续引用。

5. 它是更省事的组件组织方式，编译后还是普通 `setup`，不能说运行时一定更快。实际收益看组件内容、构建结果、同样操作下的测量。轻购整站是 `script setup` 加 TypeScript，`defineProps` 直接写类型标注，校验和类型提示一次有，比 Vue 2 时代顺很多。

## 追问：script setup 顶层代码是每次 render 都执行吗？

1. 通常不是。它对应组件实例的 `setup`，创建实例时建状态和监听，之后靠响应式依赖驱动渲染。跟 React 函数组件每次渲染整函数再跑一遍不是同一套。普通局部变量和闭包，也按各自机制理解。

2. 导入和模块级代码按模块执行语义走，不会因为每个实例都重新导入一次。共享常量可以放合适的模块范围；用户草稿在实例范围创建。两个组件实例别意外共用同一份可变对象。

3. 同时创建两个组件，更新其中一个，再重新挂载，范围就清楚了。渲染更新不该重复建立同一份外部监听；实例重建却要有自己的资源，清理也跟实例对应。代码写在顶层，不等于可以忽略生命周期。

## 追问：defineProps 写了类型，为什么接口数据还需要校验？

1. TypeScript 主要在开发编译阶段检查已知类型。运行时接口返回可能对不上声明。声明商品价格是 `number`，服务器意外返回字符串，不会自动变成合法数值，字段范围、权限、业务关系也不会因此正确。

2. Vue 可以从部分类型声明生成运行时 props 信息，它不是完整的接口数据验证系统，复杂类型转换也有编译限制。数据进应用时仍按业务检查必需字段和可接受值，错误给出合理反馈，模板别直接访问缺失层级导致崩溃。

3. 类型提示、组件接口检查、业务校验是三层。前者少写代码时的错，后两层处理运行时边界。测试可以传入缺失或异常数据，看组件能不能按约定降级。编辑器没有红线，不等于数据可靠。
