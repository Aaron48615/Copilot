# Aaron 学习笔记整理记录

本次新增 43 题，补充 19 道已有题；基础题 197 道，Aaron 总题数 396。项目题 197 道、个人情况 2 道不变。

通用知识全部归入基础题，不因与云枢、商城的技术相似就改写成项目经历。复用现有分类映射，未改用户配置、解析器和页面逻辑。已存在答案、ID 与属性保持不变，新增解释附在核心回答中。

## 新增题数

| 板块 | 新增 | 当前板块题数 |
| --- | ---: | ---: |
| JavaScript | 3 | 23 |
| 网络 | 17 | 19 |
| CSS | 1 | 22 |
| 浏览器 | 2 | 23 |
| AI 与 Agent | 10 | 10 |
| 网络与工程化 | 8 | 8 |
| HTML | 2 | 14 |

## 每份笔记的归属与对应关系

### 堆和栈.md

依据：内容讲通用机制、示例与限制，不包含可确认的 Aaron 项目实现。

| 原笔记知识点 | 处理 | 输出或已有题目 |
| --- | --- | --- |
| 先分清两组概念 | 新增 | [content/aaron/basics/javascript/heap-stack.md](../content/aaron/basics/javascript/heap-stack.md) |
| 面试直接回答 | 新增 | [content/aaron/basics/javascript/heap-stack.md](../content/aaron/basics/javascript/heap-stack.md) |
| 调用栈示例 | 新增 | [content/aaron/basics/javascript/heap-stack.md](../content/aaron/basics/javascript/heap-stack.md) |
| 基本类型一定在栈、对象一定在堆吗？ | 新增 | [content/aaron/basics/javascript/heap-stack.md](../content/aaron/basics/javascript/heap-stack.md) |
| 嵌套对象的浅拷贝示例 | 补充 | [content/aaron/basics/javascript/deep-shallow-copy.md](../content/aaron/basics/javascript/deep-shallow-copy.md) |
| JSON 拷贝的循环引用表述 | 待确认 | [aaron-notes-pending.md](aaron-notes-pending.md) |
| 闭包与调用栈的关系 | 补充 | [content/aaron/basics/javascript/closures-memory.md](../content/aaron/basics/javascript/closures-memory.md) |
| 常见内存泄漏来源 | 补充 | [content/aaron/basics/javascript/closures-memory.md](../content/aaron/basics/javascript/closures-memory.md) |
| 原始提纲 | 提纲去重 | [aaron-notes-import.md](aaron-notes-import.md) |

原笔记提供的参考链接（保留来源，不表示已逐一核实）：

- [MDN：JavaScript execution model](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Execution_model)
- [MDN：Memory management](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Memory_management)
- [MDN：structuredClone](https://developer.mozilla.org/en-US/docs/Web/API/Window/structuredClone)

### 对象、数组、函数统称object.md

依据：内容讲通用机制、示例与限制，不包含可确认的 Aaron 项目实现。

| 原笔记知识点 | 处理 | 输出或已有题目 |
| --- | --- | --- |
| 什么是闭包 | 已覆盖 | [content/aaron/basics/javascript/closures-memory.md](../content/aaron/basics/javascript/closures-memory.md) |
| JavaScript 有哪些数据类型 | 补充 | [content/aaron/basics/javascript/data-types.md](../content/aaron/basics/javascript/data-types.md) |
| 如何准确判断类型 | 补充 | [content/aaron/basics/javascript/data-types.md](../content/aaron/basics/javascript/data-types.md) |
| 数组和函数为什么也是对象 | 补充 | [content/aaron/basics/javascript/data-types.md](../content/aaron/basics/javascript/data-types.md) |
| 值相等和引用相等 | 补充 | [content/aaron/basics/javascript/equality-operators.md](../content/aaron/basics/javascript/equality-operators.md) |
| 四种常见作用域 | 补充 | [content/aaron/basics/javascript/es6-scope.md](../content/aaron/basics/javascript/es6-scope.md) |
| 什么是作用域链 | 补充 | [content/aaron/basics/javascript/es6-scope.md](../content/aaron/basics/javascript/es6-scope.md) |
| 变量提升、暂时性死区与遮蔽 | 补充 | [content/aaron/basics/javascript/es6-scope.md](../content/aaron/basics/javascript/es6-scope.md) |
| 原始提纲 | 提纲去重 | [aaron-notes-import.md](aaron-notes-import.md) |

原笔记提供的参考链接（保留来源，不表示已逐一核实）：

- [MDN：JavaScript data types and data structures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Data_structures)
- [MDN：typeof](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof)
- [MDN：Closures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Closures)
- [MDN：Functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions)

### 鉴权和轮询.md

依据：内容讲通用机制、示例与限制，不包含可确认的 Aaron 项目实现。

| 原笔记知识点 | 处理 | 输出或已有题目 |
| --- | --- | --- |
| 前端隐藏按钮能防止越权吗？ | 新增 | [content/aaron/basics/network/authentication-authorization.md](../content/aaron/basics/network/authentication-authorization.md) |
| 先分清认证和授权 | 新增 | [content/aaron/basics/network/authentication-authorization.md](../content/aaron/basics/network/authentication-authorization.md) |
| Session Cookie 与 Token | 新增 | [content/aaron/basics/network/session-token.md](../content/aaron/basics/network/session-token.md) |
| 浏览器中 Token 放在哪里 | 新增 | [content/aaron/basics/network/session-token.md](../content/aaron/basics/network/session-token.md) |
| Cookie 为什么还要防 CSRF | 新增 | [content/aaron/basics/network/session-token.md](../content/aaron/basics/network/session-token.md) |
| 轮询过程中 Token 过期怎么办？ | 新增 | [content/aaron/basics/network/token-refresh.md](../content/aaron/basics/network/token-refresh.md) |
| Access Token 与 Refresh Token 的流程 | 新增 | [content/aaron/basics/network/token-refresh.md](../content/aaron/basics/network/token-refresh.md) |
| 401 和 403 的区别 | 新增 | [content/aaron/basics/network/token-refresh.md](../content/aaron/basics/network/token-refresh.md) |
| 跨域携带 Cookie | 补充 | [content/aaron/basics/javascript/cross-origin.md](../content/aaron/basics/javascript/cross-origin.md) |
| CORS 配好了是否就安全？ | 补充 | [content/aaron/basics/javascript/cross-origin.md](../content/aaron/basics/javascript/cross-origin.md) |
| 什么是轮询 | 新增 | [content/aaron/basics/network/polling-control.md](../content/aaron/basics/network/polling-control.md) |
| 为什么不建议直接用 setInterval | 新增 | [content/aaron/basics/network/polling-control.md](../content/aaron/basics/network/polling-control.md) |
| 轮询优化清单 | 新增 | [content/aaron/basics/network/polling-control.md](../content/aaron/basics/network/polling-control.md) |
| 短轮询、长轮询、SSE、WebSocket | 补充 | [content/aaron/basics/network/websocket-sse.md](../content/aaron/basics/network/websocket-sse.md) |
| 为什么不建议直接用 setInterval | 限制说明 | [aaron-notes-pending.md](aaron-notes-pending.md) |
| 轮询优化清单 | 限制说明 | [aaron-notes-pending.md](aaron-notes-pending.md) |

原笔记提供的参考链接（保留来源，不表示已逐一核实）：

- [OWASP：Session Management Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html)
- [OWASP：HTML5 Security Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/HTML5_Security_Cheat_Sheet.html)
- [MDN：Set-Cookie](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Set-Cookie)
- [MDN：CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS)
- [MDN：Server-sent events](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events)

### 七层网络.md

依据：内容讲通用机制、示例与限制，不包含可确认的 Aaron 项目实现。

| 原笔记知识点 | 处理 | 输出或已有题目 |
| --- | --- | --- |
| 面试直接回答 | 新增 | [content/aaron/basics/network/osi-model.md](../content/aaron/basics/network/osi-model.md) |
| 七层职责与常见例子 | 新增 | [content/aaron/basics/network/osi-model.md](../content/aaron/basics/network/osi-model.md) |
| OSI 与 TCP/IP 模型的对应关系 | 新增 | [content/aaron/basics/network/osi-model.md](../content/aaron/basics/network/osi-model.md) |
| 封装与解封装 | 新增 | [content/aaron/basics/network/osi-model.md](../content/aaron/basics/network/osi-model.md) |
| IP 地址、MAC 地址、端口号 | 新增 | [content/aaron/basics/network/osi-model.md](../content/aaron/basics/network/osi-model.md) |
| 为什么需要分层？ | 新增 | [content/aaron/basics/network/osi-model.md](../content/aaron/basics/network/osi-model.md) |
| TCP 和 UDP | 新增 | [content/aaron/basics/network/tcp-udp.md](../content/aaron/basics/network/tcp-udp.md) |
| 交换机和路由器有什么区别？ | 新增 | [content/aaron/basics/network/switch-router.md](../content/aaron/basics/network/switch-router.md) |
| 排查网络问题怎么用分层思路？ | 新增 | [content/aaron/basics/network/layered-troubleshooting.md](../content/aaron/basics/network/layered-troubleshooting.md) |
| HTTP、HTTPS、WebSocket 在哪一层 | 已覆盖 | [content/aaron/basics/network/http-versions.md](../content/aaron/basics/network/http-versions.md) |
| 从输入 URL 到页面显示的分层理解 | 已覆盖 | [content/aaron/basics/html/url-rendering.md](../content/aaron/basics/html/url-rendering.md) |
| 补充稿之前的原始草稿 | 待确认 | [aaron-notes-pending.md](aaron-notes-pending.md) |

原笔记提供的参考链接（保留来源，不表示已逐一核实）：

- [Cloudflare：What is the OSI model?](https://www.cloudflare.com/learning/ddos/glossary/open-systems-interconnection-model-osi/)
- [MDN：Evolution of HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Evolution_of_HTTP)
- [MDN：Overview of HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Overview)

### 为什么0.1+0.2!=0.3.md

依据：内容讲通用机制、示例与限制，不包含可确认的 Aaron 项目实现。

| 原笔记知识点 | 处理 | 输出或已有题目 |
| --- | --- | --- |
| 面试直接回答 | 新增 | [content/aaron/basics/javascript/floating-point.md](../content/aaron/basics/javascript/floating-point.md) |
| 为什么十进制小数无法精确表示 | 新增 | [content/aaron/basics/javascript/floating-point.md](../content/aaron/basics/javascript/floating-point.md) |
| IEEE 754 双精度如何存储 | 新增 | [content/aaron/basics/javascript/floating-point.md](../content/aaron/basics/javascript/floating-point.md) |
| 正确比较浮点数 | 新增 | [content/aaron/basics/javascript/floating-point.md](../content/aaron/basics/javascript/floating-point.md) |
| 金额和高精度计算怎么做 | 新增 | [content/aaron/basics/javascript/floating-point.md](../content/aaron/basics/javascript/floating-point.md) |
| 常见误区 | 新增 | [content/aaron/basics/javascript/floating-point.md](../content/aaron/basics/javascript/floating-point.md) |
| 追问：为什么 0.1 + 0.1 === 0.2 | 新增 | [content/aaron/basics/javascript/floating-point-double.md](../content/aaron/basics/javascript/floating-point-double.md) |

原笔记提供的参考链接（保留来源，不表示已逐一核实）：

- [ECMAScript 规范：Number 与 IEEE 754](https://tc39.es/ecma262/multipage/ecmascript-data-types-and-values.html#sec-ecmascript-language-types-number-type)
- [ECMAScript 规范：Number.EPSILON](https://tc39.es/ecma262/multipage/numbers-and-dates.html#sec-number.epsilon)
- [MDN：Number.MAX_SAFE_INTEGER](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_SAFE_INTEGER)
- [牛客网：JavaScript 数字精度丢失的问题](https://www.nowcoder.com/discuss/383971917907197952)

### 为什么1px在不同的设备上有粗有细.md

依据：内容讲通用机制、示例与限制，不包含可确认的 Aaron 项目实现。

| 原笔记知识点 | 处理 | 输出或已有题目 |
| --- | --- | --- |
| 面试直接回答 | 新增 | [content/aaron/basics/css/hairline-dpr.md](../content/aaron/basics/css/hairline-dpr.md) |
| CSS 像素、物理像素和 DPR | 新增 | [content/aaron/basics/css/hairline-dpr.md](../content/aaron/basics/css/hairline-dpr.md) |
| 为什么看起来不一样 | 新增 | [content/aaron/basics/css/hairline-dpr.md](../content/aaron/basics/css/hairline-dpr.md) |
| 解决 1px 发丝线 | 新增 | [content/aaron/basics/css/hairline-dpr.md](../content/aaron/basics/css/hairline-dpr.md) |
| `1px` 是绝对长度吗 | 补充 | [content/aaron/basics/css/length-units.md](../content/aaron/basics/css/length-units.md) |
| 图片为什么在高 DPR 屏上发虚 | 新增 | [content/aaron/basics/html/image-loading.md](../content/aaron/basics/html/image-loading.md) |
| 解决 1px 发丝线 | 限制说明 | [aaron-notes-pending.md](aaron-notes-pending.md) |

原笔记提供的参考链接（保留来源，不表示已逐一核实）：

- [MDN：Window.devicePixelRatio](https://developer.mozilla.org/en-US/docs/Web/API/Window/devicePixelRatio)
- [掘金：在手机上画一条 1px 细线](https://juejin.cn/post/7071167291911569444)

### 线程和进程.md

依据：内容讲通用机制、示例与限制，不包含可确认的 Aaron 项目实现。

| 原笔记知识点 | 处理 | 输出或已有题目 |
| --- | --- | --- |
| 面试直接回答 | 新增 | [content/aaron/basics/browser/process-thread.md](../content/aaron/basics/browser/process-thread.md) |
| 核心区别 | 新增 | [content/aaron/basics/browser/process-thread.md](../content/aaron/basics/browser/process-thread.md) |
| 为什么需要多进程和多线程 | 新增 | [content/aaron/basics/browser/process-thread.md](../content/aaron/basics/browser/process-thread.md) |
| 并发和并行的区别 | 新增 | [content/aaron/basics/browser/process-thread.md](../content/aaron/basics/browser/process-thread.md) |
| 进程间为什么不能直接读取对方内存 | 新增 | [content/aaron/basics/browser/process-thread.md](../content/aaron/basics/browser/process-thread.md) |
| 线程为什么会有死锁 | 新增 | [content/aaron/basics/browser/process-thread.md](../content/aaron/basics/browser/process-thread.md) |
| 多线程一定更快吗 | 新增 | [content/aaron/basics/browser/process-thread.md](../content/aaron/basics/browser/process-thread.md) |
| 浏览器中的进程和线程 | 新增 | [content/aaron/basics/browser/browser-processes.md](../content/aaron/basics/browser/browser-processes.md) |
| JavaScript 是单线程吗 | 补充 | [content/aaron/basics/browser/web-worker.md](../content/aaron/basics/browser/web-worker.md) |

原笔记提供的参考链接（保留来源，不表示已逐一核实）：

- [Chrome for Developers：浏览器多进程架构](https://developer.chrome.com/blog/inside-browser-part1)
- [Chromium：RenderingNG 的进程与线程结构](https://developer.chrome.com/docs/chromium/renderingng-architecture)
- [MDN：JavaScript execution model](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Execution_model)
- [掘金：浏览器进程线程面试考点](https://juejin.cn/post/6854573217655291918)

### 性能优化.md

依据：内容讲通用机制、示例与限制，不包含可确认的 Aaron 项目实现。

| 原笔记知识点 | 处理 | 输出或已有题目 |
| --- | --- | --- |
| 性能指标 | 补充 | [content/aaron/basics/browser/web-vitals.md](../content/aaron/basics/browser/web-vitals.md) |
| 怎么优化 LCP | 补充 | [content/aaron/basics/browser/web-vitals.md](../content/aaron/basics/browser/web-vitals.md) |
| 怎么优化 CLS | 补充 | [content/aaron/basics/browser/web-vitals.md](../content/aaron/basics/browser/web-vitals.md) |
| 标准优化流程 | 补充 | [content/aaron/basics/browser/frontend-performance.md](../content/aaron/basics/browser/frontend-performance.md) |
| 字体优化 | 补充 | [content/aaron/basics/browser/frontend-performance.md](../content/aaron/basics/browser/frontend-performance.md) |
| 渲染和主线程优化 | 补充 | [content/aaron/basics/browser/frontend-performance.md](../content/aaron/basics/browser/frontend-performance.md) |
| 框架层优化 | 补充 | [content/aaron/basics/browser/frontend-performance.md](../content/aaron/basics/browser/frontend-performance.md) |
| 面试直接回答 | 已覆盖 | [content/aaron/basics/javascript/page-performance.md](../content/aaron/basics/javascript/page-performance.md) |
| 网络与加载优化 | 补充 | [content/aaron/basics/browser/resource-loading.md](../content/aaron/basics/browser/resource-loading.md) |
| 延迟加载、懒加载、预加载和预取 | 补充 | [content/aaron/basics/browser/resource-loading.md](../content/aaron/basics/browser/resource-loading.md) |
| Webpack 优化 | 已覆盖 | [content/aaron/basics/webpack/build-optimization.md](../content/aaron/basics/webpack/build-optimization.md) |
| HTTP 缓存和长缓存 | 补充 | [content/aaron/basics/browser/http-cache.md](../content/aaron/basics/browser/http-cache.md) |
| 无限列表和长列表 | 补充 | [content/aaron/basics/vue/large-list-rendering.md](../content/aaron/basics/vue/large-list-rendering.md) |
| CDN 为什么能加速 | 新增 | [content/aaron/basics/network/cdn-acceleration.md](../content/aaron/basics/network/cdn-acceleration.md) |
| MVC 和 MVVM（架构补充） | 补充 | [content/aaron/basics/vue/mvvm-mvc.md](../content/aaron/basics/vue/mvvm-mvc.md) |
| 防抖和节流怎么选 | 已覆盖 | [content/aaron/basics/browser/debounce-throttle.md](../content/aaron/basics/browser/debounce-throttle.md) |
| 图片优化 | 新增 | [content/aaron/basics/html/image-loading.md](../content/aaron/basics/html/image-loading.md) |
| 原始提纲 | 提纲去重 | [aaron-notes-import.md](aaron-notes-import.md) |

原笔记提供的参考链接（保留来源，不表示已逐一核实）：

- [web.dev：Web Vitals](https://web.dev/articles/vitals)
- [web.dev：优化 LCP](https://web.dev/articles/optimize-lcp)
- [web.dev：优化 INP](https://web.dev/articles/optimize-inp)
- [web.dev：优化 CLS](https://web.dev/articles/optimize-cls)
- [Webpack 官方：Code Splitting](https://webpack.js.org/guides/code-splitting/)
- [Webpack 官方：Caching](https://webpack.js.org/guides/caching/)
- [牛客网：Webpack 前端面试题合集](https://www.nowcoder.com/discuss/517588547214245888)

### AI常问.md

依据：AI 概念与通用工作流程，归入 AI 与 Agent；个人示例待确认。

| 原笔记知识点 | 处理 | 输出或已有题目 |
| --- | --- | --- |
| 1. LLM 是什么 | 新增 | [content/aaron/basics/ai-agent/llm-basics.md](../content/aaron/basics/ai-agent/llm-basics.md) |
| 4. Prompt（提示词）是什么 | 新增 | [content/aaron/basics/ai-agent/prompt-design.md](../content/aaron/basics/ai-agent/prompt-design.md) |
| 5. RAG 是什么 | 新增 | [content/aaron/basics/ai-agent/rag-basics.md](../content/aaron/basics/ai-agent/rag-basics.md) |
| 6. Fine-tuning（微调）是什么 | 新增 | [content/aaron/basics/ai-agent/fine-tuning.md](../content/aaron/basics/ai-agent/fine-tuning.md) |
| 7. Harness 是什么 | 新增 | [content/aaron/basics/ai-agent/harness-basics.md](../content/aaron/basics/ai-agent/harness-basics.md) |
| 8. Agent（智能体）是什么 | 新增 | [content/aaron/basics/ai-agent/agent-basics.md](../content/aaron/basics/ai-agent/agent-basics.md) |
| 9. Skill、Plugin 和 Tool 有什么区别 | 新增 | [content/aaron/basics/ai-agent/skill-plugin-tool.md](../content/aaron/basics/ai-agent/skill-plugin-tool.md) |
| 10. 前端如何实现 LLM 流式输出 | 新增 | [content/aaron/basics/ai-agent/llm-streaming.md](../content/aaron/basics/ai-agent/llm-streaming.md) |
| 模型版本与日期断言 | 待确认 | [aaron-notes-pending.md](aaron-notes-pending.md) |
| 常见的大模型 | 新增 | [content/aaron/basics/ai-agent/model-families.md](../content/aaron/basics/ai-agent/model-families.md) |
| 你使用什么进行 AI Coding | 待确认 | [aaron-notes-pending.md](aaron-notes-pending.md) |
| 一个可靠的 AI Coding 流程 | 新增 | [content/aaron/basics/ai-agent/coding-verification.md](../content/aaron/basics/ai-agent/coding-verification.md) |
| 原始提纲 | 提纲去重 | [aaron-notes-import.md](aaron-notes-import.md) |
| 10. 前端如何实现 LLM 流式输出 | 限制说明 | [aaron-notes-pending.md](aaron-notes-pending.md) |

原笔记提供的参考链接（保留来源，不表示已逐一核实）：

- [OpenAI 官方模型目录](https://developers.openai.com/api/docs/models)
- [OpenAI 官方模型与 Prompt 指南](https://developers.openai.com/api/docs/guides/latest-model)
- [OpenAI Developers：Codex 和 Plugins](https://developers.openai.com/)
- [MDN：Streams API](https://developer.mozilla.org/en-US/docs/Web/API/Streams_API)
- [MDN：Server-sent events](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events)

### Eslint.md

依据：内容讲通用机制、示例与限制，不包含可确认的 Aaron 项目实现。

| 原笔记知识点 | 处理 | 输出或已有题目 |
| --- | --- | --- |
| 面试直接回答 | 新增 | [content/aaron/basics/engineering/eslint-purpose.md](../content/aaron/basics/engineering/eslint-purpose.md) |
| ESLint 的工作原理 | 新增 | [content/aaron/basics/engineering/eslint-purpose.md](../content/aaron/basics/engineering/eslint-purpose.md) |
| 当前配置方式：Flat Config | 新增 | [content/aaron/basics/engineering/eslint-flat-config.md](../content/aaron/basics/engineering/eslint-flat-config.md) |
| 常用命令和工作流 | 新增 | [content/aaron/basics/engineering/eslint-flat-config.md](../content/aaron/basics/engineering/eslint-flat-config.md) |
| Parser、Plugin 和 Config 有什么区别 | 新增 | [content/aaron/basics/engineering/eslint-components.md](../content/aaron/basics/engineering/eslint-components.md) |
| ESLint 和 Prettier 的区别 | 新增 | [content/aaron/basics/engineering/eslint-prettier.md](../content/aaron/basics/engineering/eslint-prettier.md) |
| 自定义规则的最小示例 | 新增 | [content/aaron/basics/engineering/eslint-custom-rule.md](../content/aaron/basics/engineering/eslint-custom-rule.md) |
| `eslint-disable` 能不能用 | 新增 | [content/aaron/basics/engineering/eslint-disable.md](../content/aaron/basics/engineering/eslint-disable.md) |
| ESLint 能检查 TypeScript 类型错误吗 | 新增 | [content/aaron/basics/engineering/eslint-typescript.md](../content/aaron/basics/engineering/eslint-typescript.md) |
| `--fix` 会不会改坏代码 | 新增 | [content/aaron/basics/engineering/eslint-fix.md](../content/aaron/basics/engineering/eslint-fix.md) |
| 原始提纲 | 提纲去重 | [aaron-notes-import.md](aaron-notes-import.md) |
| 自定义规则的最小示例 | 限制说明 | [aaron-notes-pending.md](aaron-notes-pending.md) |

原笔记提供的参考链接（保留来源，不表示已逐一核实）：

- [ESLint 官方：Configuration Files](https://eslint.org/docs/latest/use/configure/configuration-files)
- [ESLint 官方：Command Line Interface](https://eslint.org/docs/latest/use/command-line-interface)
- [ESLint v10.0.0 发布说明](https://eslint.org/blog/2026/02/eslint-v10.0.0-released/)

### HTTP、TCP、GETPOST、状态码.md

依据：内容讲通用机制、示例与限制，不包含可确认的 Aaron 项目实现。

| 原笔记知识点 | 处理 | 输出或已有题目 |
| --- | --- | --- |
| HTTP 是什么 | 新增 | [content/aaron/basics/network/http-basics.md](../content/aaron/basics/network/http-basics.md) |
| HTTP 版本的核心区别 | 补充 | [content/aaron/basics/network/http-versions.md](../content/aaron/basics/network/http-versions.md) |
| TCP 为什么可靠 | 新增 | [content/aaron/basics/network/tcp-reliability.md](../content/aaron/basics/network/tcp-reliability.md) |
| TCP 三次握手 | 补充 | [content/aaron/basics/browser/tcp-handshake-close.md](../content/aaron/basics/browser/tcp-handshake-close.md) |
| TCP 四次挥手 | 补充 | [content/aaron/basics/browser/tcp-handshake-close.md](../content/aaron/basics/browser/tcp-handshake-close.md) |
| GET 和 POST 的区别 | 补充 | [content/aaron/basics/browser/http-methods.md](../content/aaron/basics/browser/http-methods.md) |
| 幂等性怎么理解 | 补充 | [content/aaron/basics/browser/http-methods.md](../content/aaron/basics/browser/http-methods.md) |
| HTTP 常见状态码 | 补充 | [content/aaron/basics/javascript/ajax-status.md](../content/aaron/basics/javascript/ajax-status.md) |
| 状态码高频对比 | 补充 | [content/aaron/basics/javascript/ajax-status.md](../content/aaron/basics/javascript/ajax-status.md) |
| 从输入 URL 到收到 HTTP 响应 | 已覆盖 | [content/aaron/basics/html/url-rendering.md](../content/aaron/basics/html/url-rendering.md) |
| 补充稿之前的原始草稿 | 待确认 | [aaron-notes-pending.md](aaron-notes-pending.md) |

原笔记提供的参考链接（保留来源，不表示已逐一核实）：

- [RFC 9110：HTTP Semantics](https://www.rfc-editor.org/rfc/rfc9110.html)
- [RFC 9114：HTTP/3](https://www.rfc-editor.org/rfc/rfc9114.html)
- [MDN：HTTP request methods](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Methods)
- [MDN：HTTP response status codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status)
- [MDN：Evolution of HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Evolution_of_HTTP)
- [牛客网：前端校招 OSI/HTTP 参考答案](https://www.nowcoder.com/ta/review-frontend/review?asc=false&order=knowledgePoint&page=22&query=&tpId=80&tqId=32343)

### png jpg GIF 区别.md

依据：内容讲通用机制、示例与限制，不包含可确认的 Aaron 项目实现。

| 原笔记知识点 | 处理 | 输出或已有题目 |
| --- | --- | --- |
| 面试直接回答 | 新增 | [content/aaron/basics/html/image-formats.md](../content/aaron/basics/html/image-formats.md) |
| 对比表 | 新增 | [content/aaron/basics/html/image-formats.md](../content/aaron/basics/html/image-formats.md) |
| 分别展开 | 新增 | [content/aaron/basics/html/image-formats.md](../content/aaron/basics/html/image-formats.md) |
| 现代项目怎么选 | 新增 | [content/aaron/basics/html/image-formats.md](../content/aaron/basics/html/image-formats.md) |
| 图片性能优化追问 | 已覆盖 | [content/aaron/basics/html/image-loading.md](../content/aaron/basics/html/image-loading.md) |

原笔记提供的参考链接（保留来源，不表示已逐一核实）：

- [MDN：Image file type and format guide](https://developer.mozilla.org/en-US/docs/Web/Media/Guides/Formats/Image_types)
- [web.dev：Choose the right image format](https://web.dev/learn/images/choose-image-format)

### WebSocket.md

依据：内容讲通用机制、示例与限制，不包含可确认的 Aaron 项目实现。

| 原笔记知识点 | 处理 | 输出或已有题目 |
| --- | --- | --- |
| WebSocket、轮询、SSE 怎么选 | 已覆盖 | [content/aaron/basics/network/websocket-sse.md](../content/aaron/basics/network/websocket-sse.md) |
| WebSocket 和 HTTP 是什么关系？ | 新增 | [content/aaron/basics/network/websocket-http.md](../content/aaron/basics/network/websocket-http.md) |
| 建立连接的过程 | 新增 | [content/aaron/basics/network/websocket-http.md](../content/aaron/basics/network/websocket-http.md) |
| 浏览器端基本用法 | 新增 | [content/aaron/basics/network/websocket-http.md](../content/aaron/basics/network/websocket-http.md) |
| 协议层需要知道什么 | 新增 | [content/aaron/basics/network/websocket-http.md](../content/aaron/basics/network/websocket-http.md) |
| 一句话回答 | 已覆盖 | [content/aaron/basics/network/websocket-sse.md](../content/aaron/basics/network/websocket-sse.md) |
| 1. 断线重连 | 新增 | [content/aaron/basics/network/websocket-recovery.md](../content/aaron/basics/network/websocket-recovery.md) |
| 2. 消息可靠性 | 新增 | [content/aaron/basics/network/websocket-recovery.md](../content/aaron/basics/network/websocket-recovery.md) |
| WebSocket 为什么还需要心跳？ | 新增 | [content/aaron/basics/network/websocket-heartbeat.md](../content/aaron/basics/network/websocket-heartbeat.md) |
| 3. 心跳和连接保活 | 新增 | [content/aaron/basics/network/websocket-heartbeat.md](../content/aaron/basics/network/websocket-heartbeat.md) |
| 4. 背压 | 新增 | [content/aaron/basics/network/websocket-backpressure.md](../content/aaron/basics/network/websocket-backpressure.md) |
| 5. 集群扩展 | 新增 | [content/aaron/basics/network/websocket-cluster.md](../content/aaron/basics/network/websocket-cluster.md) |
| WebSocket 是否受 CORS 限制？ | 新增 | [content/aaron/basics/network/websocket-origin.md](../content/aaron/basics/network/websocket-origin.md) |
| 鉴权与安全 | 新增 | [content/aaron/basics/network/websocket-origin.md](../content/aaron/basics/network/websocket-origin.md) |

原笔记提供的参考链接（保留来源，不表示已逐一核实）：

- [RFC 6455：The WebSocket Protocol](https://www.rfc-editor.org/rfc/rfc6455)
- [MDN：WebSocket API](https://developer.mozilla.org/zh-CN/docs/Web/API/WebSocket)
- [MDN：Writing WebSocket servers](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API/Writing_WebSocket_servers)

## 冲突、缺失与边界

详见 [待确认原文](aaron-notes-pending.md)。AI Coding 示范经历没有归入任何项目或个人情况；具体模型版本断言暂不导入。七层网络及 HTTP 旧稿与补充稿冲突的旧稿已完整保留。堆栈笔记的 JSON 循环引用错误表述没有覆盖已有正确答案。

空提纲在同份笔记的补充稿中已有内容，未生成空答案题。性能笔记旧版全局 hash 示例由补充稿 contenthash 说明承接，两者的选择差异保留在待确认材料。未新增缺失答案占位题。

## 验证

- `npm test`：74/74 通过，包括 197 道基础题八字段、核心模块、唯一 ID、内容哈希、侧栏分类计数与搜索检查。
- `npm run test:e2e`：15/15 通过。
- `npm run build`：通过；归属验证为牛 537 题、Aaron 396 题。保留原有大包告警，本次构建 JS 约 3.11 MB（gzip 约 1.12 MB）。
- 原文审计：19 道已有题逐一验证原文件文本完整保留为前缀，属性及 ID 没有改动；57 个来源代码块均保留或对应已有相同示例（闭包例子仅空行不同，未重复追加）。13 份笔记版本的 SHA-256 和原文段落位置见 [机器可读来源记录](aaron-notes-import.json)。
- 页面实测：头像菜单可切换到 Aaron 396 题；HTML 14、CSS 22、AI 与 Agent 10、网络与工程化 8、网络 19 的侧栏和点击后列表数量一致；浮点精度、1px、ESLint 配置、LLM 流式输出均可搜索并打开，答案中的关键解释与代码可显示。
- 浏览器控制台仅观察到现有 `/favicon.ico` 404，没有此次题目加载导致的运行错误。未验证需要模型密钥的在线 AI 生成；这次验收的是本地题库搜索和显示。
- 测试检查修正：原有一级标题正则会把代码围栏里的 HTTP `#` 注释误判成题目；只修正测试以跳过代码围栏，并继续要求围栏闭合、正文恰好一个匹配 title 的一级标题。应用解析器没有改动。
- `git diff --check` 通过；其他用户、197 道项目题、2 道个人情况题及用户配置未改动。未提交、未推送、未部署。
