---
id: aaron-basic-react-jsx-syntax
title: JSX 是什么，和 JavaScript、HTML 有什么关系
aliases: [请讲讲：JSX 是什么，和 JavaScript、HTML 有什么关系, 关于“JSX 是什么，和 JavaScript、HTML 有什么关系”，你会怎样回答？]
category: react
difficulty: 基础
priority: normal
projects: []
keywords: [JSX, JavaScript, HTML, Babel]
---

# JSX 是什么，和 JavaScript、HTML 有什么关系

## 核心回答

JSX 是 JavaScript 的语法扩展，让我能在 JavaScript 里写接近 HTML 的界面结构，比如组件、属性和嵌套内容。它不是直接把一段 HTML 字符串塞进页面，表达式要写在大括号里，事件也可以直接传函数。

浏览器不能直接执行 JSX，需要经过转换。经典转换会生成 React.createElement 调用，自动 JSX 转换则使用 JSX runtime 的函数，最终都还是 JavaScript 的界面描述。Webpack 可以组织这条构建流程，具体 JSX 转换通常由 Babel 等工具完成。

【JSX 和 HTML 也有语法区别，比如常用 className、htmlFor，标签需要正确闭合。普通字符串插值会被转义，真正插入 HTML 要用专门接口并处理可信度。JSX 也不是只能被 React 使用。】
