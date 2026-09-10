---
id: aaron-basic-webpack-spa-mpa
title: 单页应用和多页应用怎么配置
aliases: [请讲讲：单页应用和多页应用怎么配置, 关于“单页应用和多页应用怎么配置”，你会怎样回答？]
category: webpack
difficulty: 基础
priority: normal
projects: []
keywords: [SPA, MPA, entry, HtmlWebpackPlugin]
---

# 单页应用和多页应用怎么配置

## 核心回答

单页应用通常只有一个 HTML 入口，Webpack 的 entry 指向应用入口脚本，再通过 HtmlWebpackPlugin 等生成页面。页面里的不同业务路由由前端路由器控制，可以用动态导入拆分路由代码。

多页应用则给每个页面配置自己的 entry，比如 home、admin，再分别生成对应的 HTML，并指定各页面需要引入的 Chunk。公共依赖可以通过 splitChunks 处理，避免每个页面都重复打入同一份代码。

如果页面很多，可以按目录约定自动扫描入口，减少新增页面时的手工配置。旧方案里有 AutoWebPlugin，但重点是入口、HTML 和资源依赖要对应，不是必须依赖某一个自动化插件。
