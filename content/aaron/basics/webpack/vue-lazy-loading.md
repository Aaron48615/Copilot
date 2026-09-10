---
id: aaron-basic-webpack-vue-lazy-loading
title: Vue 的按需加载，以及 Webpack 怎么解析 .vue
aliases: [请讲讲：Vue 的按需加载，以及 Webpack 怎么解析 .vue, 关于“Vue 的按需加载，以及 Webpack 怎么解析 .vue”，你会怎样回答？]
category: webpack
difficulty: 基础
priority: normal
projects: []
keywords: [Vue, 懒加载, vue-loader, 动态import]
---

# Vue 的按需加载，以及 Webpack 怎么解析 .vue

## 核心回答

Vue 的按需加载可以分两类。组件库是只引入需要的组件和样式，具体用库提供的导入方式或对应插件，避免直接全量引入；业务页面可以用动态 import，比如路由配置里写 () => import('./Detail.vue')，让构建工具拆出独立资源，进入页面时再加载。

普通异步组件在 Vue 3 可以用 defineAsyncComponent 包装加载函数，和路由的懒加载写法要区分。动态 import 返回 Promise，加载失败时也要有合适的错误处理，不能只考虑成功显示。

Webpack 解析 .vue 文件时，通常给 .vue 配置 vue-loader，并使用配套 VueLoaderPlugin，让 template、script、style 进入各自的处理流程。Vue 2 常见的是配套版本的 vue-template-compiler；Vue 3 使用对应的 @vue/compiler-sfc，入口初始化也从 new Vue 变成 createApp。

【旧组件库可能需要 babel-plugin-component、babel-plugin-import，是否仍需要取决于库版本和导出方式。Promise polyfill 也要根据目标浏览器决定，不能为了 import() 一律全量引入。】
