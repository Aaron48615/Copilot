---
id: aaron-basic-webpack-hot-module-replacement
title: Webpack 热更新 HMR 怎么实现
aliases: [请讲讲：Webpack 热更新 HMR 怎么实现, 关于“Webpack 热更新 HMR 怎么实现”，你会怎样回答？]
category: webpack
difficulty: 深入
priority: normal
projects: []
keywords: [HMR, 模块热替换, 更新边界]
---

# Webpack 热更新 HMR 怎么实现

## 核心回答

HMR 的目标是不刷新整个页面，只替换发生变化的模块，尽量保留当前页面状态。开发服务器先监听文件变化，让 Webpack 重新编译相关内容，开发中通常通过 dev-middleware 从内存提供构建结果。

编译完成后，服务端通过 WebSocket 等连接通知浏览器有更新，浏览器里的 HMR runtime 再获取更新信息和模块代码。运行时会沿模块依赖寻找可以接受更新的边界，执行旧模块的清理、应用新模块，再由框架相关支持把变化反映到界面。

如果更新无法被接受或执行失败，开发服务器可以按配置回退到整页刷新。整页刷新是 live reload，和 HMR 不是一回事；也不是所有更新都能无条件保留全部组件状态。

【旧 dev-server 版本会看到 SockJS、watchContentBase 等名称，核心还是“监听编译、通知客户端、下载更新、接受替换”。静态文件变化直接触发刷新，也不能当成模块热替换。】
