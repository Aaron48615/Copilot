---
id: lidi-202609-import-04-browser-network-engineering-loader-plugin-q01
title: css-loader 和 style-loader 各自负责什么？
aliases: []
category: current-interview
difficulty: 高频
priority: high
projects: []
keywords: [loader, plugin, 编译, 打包]
---

# css-loader 和 style-loader 各自负责什么？

## 核心回答

1. css-loader 管的是 CSS 怎么变成模块。它会解析里面的 `@import`、`url()`，把依赖交给构建继续处理。它本身不会把样式贴到页面上，构建能读懂这份 CSS，浏览器也不一定已经在用。

2. style-loader 才是运行时往页面插 `style` 标签，样式这时才真正生效。开发时常用它，改一行颜色能跟着热更新，不用整页刷新。生产经常换成抽成独立 CSS 文件，用 `link` 引，缓存和加载都能自己安排。

3. 普通转换是从右往左。比如写成 `['style-loader', 'css-loader', 'sass-loader']`，先是 Sass 转成 CSS，再 css-loader 处理依赖，最后 style-loader 注入。写反了，css-loader 就会拿到还没转完的 Sass，直接报错。配置里看到的顺序，和真正执行顺序不是一回事。

4. 开发和生产别把 style-loader 跟抽文件的 loader 混在同一条规则里。开发走注入，生产走抽文件。CSS Modules 也只是把类名做成局部映射，模板里还写原来的类名、没去读导出的那份映射，样式插进去了，元素也对不上生成后的选择器。

5. 页面没样式，常见是文件没被入口 import、规则没命中这个文件、抽出来没人引用，或者选择器被盖住了。看产物里有没有这份 CSS，再看页面里有没有对应的 `style` 或 `link`。别只反复改 loader 名字。

## 追问：用了 css-loader，为什么页面还是没有样式？

1. css-loader 只把 CSS 转成模块、处理依赖，不会在所有场景自动插到页面。还得有 style-loader 注入，或者抽成文件后 HTML 去引用。构建阶段能处理 CSS，不等于浏览器已经应用它。

2. 业务入口有没有 import 这份样式、规则打没打中这个文件，这两步先看。再打开页面，看有没有对应的 `style` 或 `link`。资源已经在、看起来没效果，就查选择器、覆盖顺序，还有 CSS Modules 生成的类名对不对。

3. 生产还要看副作用配置。`sideEffects: false` 写错，样式导入可能被优化掉，开发热更新正常、打包后没样式。拿一条最小可见样式对一下真正的生产产物，能分清是构建漏了，还是页面上被别的样式盖住。

## 追问：为什么生产环境常把 CSS 提取成独立文件？

1. 独立 CSS 可以按自己的内容变化去缓存，不必等 JavaScript 执行完才注入。浏览器也能更早发现这份样式。首屏布局要是等脚本跑完才出来，页面会空一段时间。

2. CSS 文件本身也可能挡住渲染，抽出来不是免费的。文件太大、加载顺序乱、路由样式拆成一堆小文件，或者关键 CSS 被错误地异步掉，照样会等，甚至闪一下没有样式的页面。

3. 看生成 HTML 里怎么引用、网络里实际请求了什么。覆盖首次打开、切路由、带缓存再进。动态页的 CSS 来不来得及、旧样式会不会冲突，比 dist 里多出一个 css 文件更要紧。
