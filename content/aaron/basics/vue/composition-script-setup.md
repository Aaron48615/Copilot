---
id: aaron-basic-vue-composition-script-setup
title: Options API、Composition API 和 script setup 有什么关系
aliases: [请讲讲：Options API、Composition API 和 script setup 有什么关系, 关于“Options API、Composition API 和 script setup 有什么关系”，你会怎样回答？]
category: vue
difficulty: 基础
priority: normal
projects: []
keywords: [OptionsAPI, CompositionAPI, script-setup]
---

# Options API、Composition API 和 script setup 有什么关系

## 核心回答

Options API 是按 data、methods、computed、watch 这些选项组织代码。简单组件里很直观，但一个功能复杂起来后，相关代码可能分散在好几个选项里。Composition API 则可以把同一功能的状态和操作放在一起，比如搜索词、请求方法和监听逻辑挨着写，再按需要抽成 useSearch 这样的组合函数。

我觉得组合函数比较方便的地方是，依赖和返回值都比较明确，多个组件复用时，也不容易像混入多个 mixin 那样分不清数据从哪来。每次调用是否独立保存状态，仍然取决于变量定义在函数内部还是外面，不是名字以 use 开头就自动独立。

script setup 是单文件组件里写 Composition API 的编译语法糖。顶层声明的变量、函数和导入组件可以直接在模板里使用，不需要手动 return。defineProps 声明属性，defineEmits 声明事件，useAttrs、useSlots 获取透传属性和插槽，需要让父组件通过 ref 调用的方法，可以用 defineExpose 暴露。

【defineProps、defineEmits、defineExpose 是编译宏，useAttrs、useSlots 是运行时 API。script setup 的代码会按组件实例执行，不是整个模块只执行一次。两套 API 并不是新旧只能选一个，具体用法要和团队已有代码保持一致。】
