---
id: aaron-basic-vue-component-registration
title: Vue 怎么创建组件，Vue.extend、Vue.component 和 vue-loader 分别做什么
aliases: [请讲讲：Vue 怎么创建组件，Vue.extend、Vue.component 和 vue-loader 分别做什么, 关于“Vue 怎么创建组件，Vue.extend、Vue.component 和 vue-loader 分别做什么”，你会怎样回答？]
category: vue
difficulty: 基础
priority: normal
projects: []
keywords: [Vue.extend, Vue.component, vue-loader]
---

# Vue 怎么创建组件，Vue.extend、Vue.component 和 vue-loader 分别做什么

## 核心回答

Vue 2 可以先定义一个组件选项对象，在父组件的 components 中局部注册，也可以用 Vue.component('my-card', options) 全局注册。Vue.extend(options) 是从选项生成组件构造函数，生成后仍然要注册或实例化挂载，它本身不等于全局注册。

template 标签或者字符串主要用来提供模板结构，模板本身不是完整的注册过程。在项目里更常见的是 .vue 单文件组件，把 template、script、style 放在一起，再 import 到需要的地方。

Webpack 要处理 .vue 文件时，会用 vue-loader 配合对应编译器，把各部分交给合适的处理链，最终组成可加载的模块。比如脚本需要 Babel，样式需要 CSS 或 Sass Loader，都要配套配置，不是装一个 vue-loader 就自动支持所有语法。

【Vue.component('my-card') 只传名字时，可以获取已经注册的全局组件。Vue 3 通常使用 createApp 和 app.component，不能照搬 Vue.extend。旧模板预处理器 Jade 后来叫 Pug，是否使用由具体配置决定。】
