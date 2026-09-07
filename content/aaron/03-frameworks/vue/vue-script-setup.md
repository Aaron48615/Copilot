---
id: vue-script-setup
title: script setup 是干什么的？
aliases: [setup语法糖, defineProps, defineExpose, 自动注册]
category: vue
difficulty: 高频
priority: high
projects: []
keywords: [script setup, defineProps, defineEmits, defineExpose, 语法糖]
---

# script setup 是干什么的？

## 核心回答

script setup 是 Vue 单文件组件里使用 Composition API 的简写。顶层变量和函数可以直接在模板中使用，不必再手动从 setup 返回。defineProps 和 defineEmits 用来声明组件参数和事件。

它主要减少样板代码，不代表换成这个写法就一定有运行时性能提升。

## 追问：defineProps 为什么通常不用 import？

它是编译宏，由单文件组件编译器识别和处理，不是普通的运行时函数。使用类型声明时可以获得编辑器提示，但外部数据是否符合预期，仍要考虑必要的运行时校验。
