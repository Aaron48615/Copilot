# Aaron 基础题补充：参考牛题库的通用考点

本次按用户授权，从牛题库的通用技术问题里选取缺口，重新写成应届前端面试的自然口述答案。不是原文复制，也不代表 Aaron 具备来源中的项目经历。

新增阶段补充 28 题，Aaron 从 126 项变为 154 项（仍包含一项原有 Vue 练习占位）。该阶段原有 126 项不改，牛的全部配置与题目不改。后续口吻修订见下节。

## 40 道答案口吻修订（2026-09-09）

按用户确认的范围，仅调整 Git 12 题和本报告新增 28 题的“核心回答”。原理直接陈述；涉及选择时自然表达偏好并说明理由，减少反复使用“我会先”，不要求每题都有第一人称，不编造使用经历。逐题对照检查口述衔接、技术含义和适用条件，保留原有例子与全部代码块。

以修改前的文件快照核对：恰好 40 个题目文件发生答案修改，题目、ID、八个属性字段、分类和代码块逐字不变；其他 114 项、牛题库、用户配置和应用代码未变。题库仍为 154 项。同步更新 `tests/fixtures/aaron-basics.json` 中这 40 项的 SHA-256 答案摘要，来源、来源标题和 provenance 均保留。Git 来源与拆题记录仍见 [导入及 Git 修订说明](aaron-basics-import.md)，新增 28 题的来源对应关系仍见本报告下文。

本次验证：`npm test` 72/72 通过，`npm run build` 通过（仍有既有的大包警告）。重启本项目本地 API 后，在真实浏览器分别搜索并打开 Git 常用指令、Flex/Grid、TypeScript 泛型和 React state 快照题，均显示修订后的回答；TypeScript 代码块正常显示，侧栏对应数量为 12、21、6、17，总数 154。`git diff --check` 通过。未提交、推送或部署。

## 筛选理由

- **补明显空白**：TypeScript 之前没有独立题目，先补作用、interface/type、any/unknown/never、泛型、运行时校验与请求状态，不直接上复杂条件类型和 infer。
- **补具体理解和判断**：模块化、new、集合、请求并发与取消；CSS 的布局选择、移动适配和层叠排错；React 受控表单、状态快照和旧闭包。这些不是把原来的综合题换个标题重复导入。
- **补常见页面能力**：表单可访问性、Vue 组合函数和长列表、资源加载、Worker、性能指标、协议差异、实时推送、构建与测试基础。
- **不重复添加**：闭包、this、原型链、深浅拷贝、事件循环、Promise 基础、BFC、居中、Vue 生命周期与响应式、Diff、HTTP 缓存和 Git 等已有实质答案，不因来源标题更细就全部复制。
- **暂不扩展**：个人求职、具体项目、AI 开发经历，以及更专项的 SSR hydration、复杂类型推导、监控成本与系统设计题，不作为这次应届基础题的优先补充。此为选题判断，不是断言这些内容不重要或面试一定不问。

存在少量必要的考点衔接：旧题已经提到 Hooks 的函数式更新和旧闭包，本次分别补充“为什么”和处理方式；旧题提到 Map/Set 和虚拟列表，本次补充选型与排查。没有删除或合并原题。来源中的移动适配项目参数与技术使用经历全部舍弃，只保留通用问题。

## 新增数量

| 板块 | 新增 | 当前总数 |
| --- | ---: | ---: |
| HTML | 1 | 12 |
| CSS | 3 | 21 |
| JavaScript | 5 | 20 |
| TypeScript | 6 | 6 |
| React | 3 | 17 |
| Vue | 2 | 25 |
| 浏览器 | 3 | 21 |
| 网络 | 2 | 2 |
| Webpack | 2 | 17 |
| 测试与质量 | 1 | 1 |
| Git | 0 | 12 |

新增 `typescript` 与 `network` 显示映射；`testing` 复用已有“测试与质量”映射。沿用 category 分类功能，保留 html-css 与 current-interview 行为。原文网络与工程化混合板块的题按主要考点分入 browser、network、webpack；不搬原分类的特殊面试属性。Vite 对比、构建题归现有 webpack 板块，避免额外造一个只有两题的工具分类。

## 来源与输出

来源仅说明选题依据。`tests/fixtures/aaron-basics.json` 对新增项标记 `user-approved-topic-adaptation`，答案摘要对应重写稿。

| 来源原题 | 新题 | 输出文件 |
| --- | --- | --- |
| [前端表单怎么做得更容易使用？](../content/default/10-lidi-interview/import-01-html-css-accessibility-form.md) | 前端表单怎么做得更容易使用？ | [accessible-form.md](../content/aaron/basics/html/accessible-form.md) |
| [Flex 和 Grid 怎么根据场景选择？](../content/default/10-lidi-interview/import-01-html-css-modern-layout.md) | Flex 和 Grid 怎么根据场景选择？ | [flex-grid.md](../content/aaron/basics/css/flex-grid.md) |
| [移动端适配是怎么做的？](../content/default/10-lidi-interview/import-01-html-css-responsive-layout.md) | 移动端适配是怎么做的？ | [responsive-layout.md](../content/aaron/basics/css/responsive-layout.md) |
| [z-index 为什么有时候不生效？](../content/default/10-lidi-interview/import-01-html-css-stacking-context.md) | z-index 为什么有时候不生效？ | [stacking-context.md](../content/aaron/basics/css/stacking-context.md) |
| [ESM 和 CommonJS 有什么区别？](../content/default/10-lidi-interview/import-02-javascript-esm-cjs.md) | ESM 和 CommonJS 有什么区别？ | [esm-commonjs.md](../content/aaron/basics/javascript/esm-commonjs.md) |
| [new 一个对象时底层发生了什么？](../content/default/10-lidi-interview/import-02-javascript-new-operator.md) | new 一个对象时底层发生了什么？ | [new-operator.md](../content/aaron/basics/javascript/new-operator.md) |
| [Map、Set、WeakMap 和 WeakSet 怎么选？](../content/default/10-lidi-interview/import-02-javascript-map-set-weak.md) | Map、Set、WeakMap 和 WeakSet 怎么选？ | [map-set-weak.md](../content/aaron/basics/javascript/map-set-weak.md) |
| [前端请求并发太多时怎么控制？](../content/default/10-lidi-interview/import-02-javascript-promise-concurrency.md) | 前端请求并发太多时怎么控制？ | [request-concurrency.md](../content/aaron/basics/javascript/request-concurrency.md) |
| [AbortController 取消 fetch 后 Promise 会怎样？](../content/default/10-lidi-interview/import-02-javascript-abort-controller.md) | AbortController 取消 fetch 后 Promise 会怎样？ | [abort-fetch.md](../content/aaron/basics/javascript/abort-fetch.md) |
| [TypeScript 在项目里是怎么用的？](../content/default/10-lidi-interview/import-02-javascript-typescript-daily.md) | TypeScript 能帮前端解决什么问题？ | [typescript-purpose.md](../content/aaron/basics/typescript/typescript-purpose.md) |
| [interface 和 type 在项目里怎么取舍？](../content/default/10-lidi-interview/import-02-javascript-interface-type.md) | interface 和 type 有什么区别，怎么选？ | [interface-type.md](../content/aaron/basics/typescript/interface-type.md) |
| [unknown、any 和 never 应该怎么选？](../content/default/10-lidi-interview/import-02-javascript-unknown-never.md) | any、unknown 和 never 有什么区别？ | [any-unknown-never.md](../content/aaron/basics/typescript/any-unknown-never.md) |
| [泛型在前端 API 封装里怎么用？](../content/default/10-lidi-interview/import-02-javascript-generic-api.md) | 泛型在接口数据类型里怎么用？ | [generic-response.md](../content/aaron/basics/typescript/generic-response.md) |
| [TypeScript 项目为什么还需要运行时校验？](../content/default/10-lidi-interview/import-02-javascript-runtime-validation.md) | 用了 TypeScript，为什么还要校验接口数据？ | [runtime-validation.md](../content/aaron/basics/typescript/runtime-validation.md) |
| [如何用可辨识联合描述请求状态？](../content/default/10-lidi-interview/import-02-javascript-discriminated-union.md) | 怎么用 TypeScript 联合类型表示请求状态？ | [request-state-union.md](../content/aaron/basics/typescript/request-state-union.md) |
| [React 表单应该用受控还是非受控？](../content/default/10-lidi-interview/import-03-frameworks-react-forms.md) | React 表单的受控和非受控有什么区别？ | [controlled-input.md](../content/aaron/basics/react/controlled-input.md) |
| [React 为什么说 state 是一次 render 的快照？](../content/default/10-lidi-interview/import-03-frameworks-react-state-snapshot.md) | React 为什么说 state 是一次渲染的快照？ | [state-snapshot.md](../content/aaron/basics/react/state-snapshot.md) |
| [React 的 stale closure 是什么，怎么处理？](../content/default/10-lidi-interview/import-03-frameworks-react-stale-closure.md) | React 回调里读到旧状态，怎么处理？ | [stale-closure.md](../content/aaron/basics/react/stale-closure.md) |
| [Vue 的 composable 应该怎么设计？](../content/default/10-lidi-interview/import-03-frameworks-vue-composable-design.md) | Vue 的 composable 应该怎么设计？ | [composable-design.md](../content/aaron/basics/vue/composable-design.md) |
| [Vue 大列表和 v-for 渲染慢时怎么排查？](../content/default/10-lidi-interview/import-03-frameworks-vue-rendering-list.md) | Vue 大列表渲染慢时怎么排查？ | [large-list-rendering.md](../content/aaron/basics/vue/large-list-rendering.md) |
| [defer、async、preload 和 prefetch 怎么选？](../content/default/10-lidi-interview/import-04-browser-network-engineering-resource-loading.md) | defer、async、preload 和 prefetch 怎么选？ | [resource-loading.md](../content/aaron/basics/browser/resource-loading.md) |
| [Web Worker 适合解决什么问题？](../content/default/10-lidi-interview/import-04-browser-network-engineering-web-worker.md) | Web Worker 适合解决什么问题？ | [web-worker.md](../content/aaron/basics/browser/web-worker.md) |
| [LCP、INP、CLS 分别怎么理解和优化？](../content/default/10-lidi-interview/import-04-browser-network-engineering-web-vitals.md) | LCP、INP、CLS 分别反映什么问题？ | [web-vitals.md](../content/aaron/basics/browser/web-vitals.md) |
| [HTTP/1.1、HTTP/2 和 HTTP/3 有什么差别？](../content/default/10-lidi-interview/import-04-browser-network-engineering-http2-http3.md) | HTTP/1.1、HTTP/2 和 HTTP/3 有什么差别？ | [http-versions.md](../content/aaron/basics/network/http-versions.md) |
| [WebSocket 和 SSE 怎么选择？](../content/default/10-lidi-interview/import-04-browser-network-engineering-websocket-sse.md) | WebSocket 和 SSE 怎么选择？ | [websocket-sse.md](../content/aaron/basics/network/websocket-sse.md) |
| [Vite 和 Webpack 有什么区别？](../content/default/10-lidi-interview/import-04-browser-network-engineering-vite-webpack.md) | Vite 和 Webpack 有什么区别？ | [vite-webpack.md](../content/aaron/basics/webpack/vite-webpack.md) |
| [source map、构建缓存和可复现构建怎么做？](../content/default/10-lidi-interview/import-04-browser-network-engineering-source-map-build.md) | source map、构建缓存和可复现构建怎么理解？ | [source-map-build.md](../content/aaron/basics/webpack/source-map-build.md) |
| [单元、组件、集成和 E2E 测试分别测什么？](../content/default/10-lidi-interview/import-07-testing-test-strategy.md) | 单元、组件、集成和 E2E 测试分别测什么？ | [test-levels.md](../content/aaron/basics/testing/test-levels.md) |

## 技术核对

技术陈述与个人判断分开：原理直接讲事实，选择和取舍说明理由，不编造使用经历、成果数字或代码证据。保留每题八字段和单一核心回答。

- TypeScript 的基本类型、类型别名与接口、收窄和泛型参考 [Everyday Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html)、[Narrowing](https://www.typescriptlang.org/docs/handbook/2/narrowing.html)、[Generics](https://www.typescriptlang.org/docs/handbook/2/generics.html)。运行时数据仍须校验。
- React 参考 [State as a Snapshot](https://react.dev/learn/state-as-a-snapshot) 和 [input](https://react.dev/reference/react-dom/components/input)。不把更新 state 解释成直接改变当前闭包，不把 defaultValue 当持续控制值。
- [Vite 官方指南](https://vite.dev/guide/) 当前使用 Rolldown，不能把旧版 esbuild/Rollup 组合作为永久实现；答案明确版本条件。
- [Web Vitals](https://web.dev/articles/vitals) 使用 LCP、INP、CLS，本次以体验含义为主，不塞固定阈值或背复杂统计窗口。

## 新增阶段验证结果

- 题库归属检查：牛 537 题、Aaron 154 项，所有新题 projects 为空，无其他用户身份和项目标记。
- 对比本次修改前的文件摘要：原 126 项、牛题库和 users.json 全部未变；本次只新建 28 个题目文件，并增加两项 category 映射、同步计数及来源校验记录。
- `npm test`：72/72 通过，涵盖全部题目格式、ID、答案摘要、分类及归属检查。
- `npm run build`：通过，仍有既有的大包警告（约 2.57 MB JS，gzip 967 KB），未调高警告阈值。
- `npm run test:e2e`：15/15 通过。
- 真实浏览器逐个点击 11 个分类：各列表数量与当前文件数一致，所有列表标签属于选中分类，HTML 与 CSS 仍独立。
- 搜索泛型题可以打开新口述回答与 TypeScript 代码块。本地 API 已重新启动加载新增题库，semantic 状态为 ready；DeepSeek 未配置，本次没有验证或调用外部生成服务。
- API 重启期间出现短暂健康检查错误，恢复后 ready；不涉及停止其他项目服务。
- `git diff --check` 通过；临时脚本、日志与截图在系统临时目录，未放进 content 或最终改动。
- 本地地址仍为 http://127.0.0.1:4175/，未提交、推送、创建 PR 或部署。
