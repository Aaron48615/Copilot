---
id: engineering-bundler-comparison
title: Webpack 和 gulp、Rollup 这类工具有什么区别？
aliases: [构建工具对比, gulp区别, rollup区别, 打包工具选型]
category: engineering
difficulty: 基础
priority: normal
projects: []
keywords: [gulp, rollup, vite, 任务流]
---

# Webpack 和 gulp、Rollup 这类工具有什么区别？

## 核心回答

Webpack 和 Rollup 都能根据模块依赖生成产物。Webpack 的扩展生态覆盖很多应用构建场景，Rollup 常用于库构建。Vite 在构建之外还提供开发服务器等能力，具体底层工具要看版本。

Gulp 更像任务编排工具，比如处理图片、复制文件、串联命令，不等同于专门的模块打包器。选工具时主要看现有工程、插件兼容性和维护成本。

## 追问：Vite 的生产构建一直使用 Rollup 吗？

不是。早期版本使用 Rollup，Vite 8 改用了 Rolldown。排查构建配置时应该先看 package.json 和锁文件中的实际版本，再查对应版本的配置，不能直接套用旧教程。
