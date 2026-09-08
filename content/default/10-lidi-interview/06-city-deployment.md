---
id: lidi-202609-city-deployment
title: 这个项目最后是怎么部署上线的？
aliases: [城市视图部署在哪里, React 项目怎么上线, 前后端接口上线后怎么访问]
category: current-interview
difficulty: 必问
priority: high
projects: [城市视图]
keywords: [部署, Cloudflare Pages, Vite, API 代理, 环境变量]
---

# 这个项目最后是怎么部署上线的？

## 核心回答

前端先执行 TypeScript 构建和 Vite 打包，生成 `dist` 静态文件，再部署到 Cloudflare Pages。因为这是单页应用，项目配置了重写规则，直接刷新子路由时也会返回 `index.html`，再交给 React Router 处理。

浏览器里的接口统一请求本站 `/api`，线上通过 Pages Function 把请求转发到后端，前端不直接在业务代码里写生产服务器地址。高德地图的 Key 和安全密钥通过环境变量提供，本地和线上分别配置。

上线前我会跑 ESLint 和 build，确认类型和构建通过。这个检查能发现编译问题，但不能替代真实环境验证，接口代理、高德地图域名白名单和后端可用性仍然要在线上实际检查。

## 追问：为什么不让浏览器直接请求后端地址？

统一走本站 `/api`，前端不用区分本地和生产域名，也能减少跨域配置和后端地址暴露带来的维护问题。代理只是在转发请求，身份校验、权限和数据安全仍然要由后端负责。

## 追问：刷新一个子页面为什么可能出现 404？

React Router 的 BrowserRouter 使用真实路径。用户直接打开 `/visual/map` 时，静态服务器如果按文件查找，就会找不到这个文件。服务器需要把未知前端路由回退到 `index.html`，让前端路由接管；接口和静态资源路径则不能被错误回退。
