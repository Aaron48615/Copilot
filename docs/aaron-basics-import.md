# Aaron 基础技术题库接入记录

最新状态：随后参考牛的通用技术考点补充 28 题，当前共 154 项；见[补题清单与来源](aaron-basics-supplement.md)。以下 126、115 等数字保留为各次修订的历史记录。

## 后续修订：Git 口语题拆分

用户随后明确要求结合《Git 使用.md》拆题并重写答案，因此下方首次导入记录的“115 个文件、Git 1 题、原文逐字保留”仅描述当时结果。**当前 Git 为 12 题，Aaron 合计 126 项；除 Git 外的 114 项保持原样（其中含 Vue 练习占位）。**

原 `git-workflow.md` 的 ID 保留，题目收窄为 Git 与 SVN 的基础理解，其余话题拆成独立文件。每题仍使用原八字段和单一“核心回答”模块，不增加追问、证据或个人项目关联。

这次答案采用面试对话口吻，用“我会怎么判断”表达选择，不编造“我曾经在某项目处理过”的经历。常用命令题保留一个自然的总览，具体操作边界由其他题解释，避免在一个回答里背整张命令表。

| 题目 | 文件 |
| --- | --- |
| Git 是什么，和 SVN 有什么区别？ | [git-workflow.md](../content/aaron/basics/git/git-workflow.md) |
| Git 常用指令有哪些？ | [common-commands.md](../content/aaron/basics/git/common-commands.md) |
| 工作区、暂存区和仓库有什么区别？ | [working-tree-staging.md](../content/aaron/basics/git/working-tree-staging.md) |
| 开发一个新功能时，Git 分支怎么用？ | [branch-workflow.md](../content/aaron/basics/git/branch-workflow.md) |
| git fetch 和 git pull 有什么区别？ | [fetch-pull.md](../content/aaron/basics/git/fetch-pull.md) |
| git merge 和 git rebase 有什么区别？ | [merge-rebase.md](../content/aaron/basics/git/merge-rebase.md) |
| Git 出现冲突时，你会怎么处理？ | [resolve-conflicts.md](../content/aaron/basics/git/resolve-conflicts.md) |
| 提交错了怎么撤销，reset 和 revert 有什么区别？ | [undo-commits.md](../content/aaron/basics/git/undo-commits.md) |
| 代码没写完要切换任务，git stash 怎么用？ | [stash-changes.md](../content/aaron/basics/git/stash-changes.md) |
| Fork、分支和 Pull Request 分别是什么？ | [fork-pull-request.md](../content/aaron/basics/git/fork-pull-request.md) |
| 怎么判断当前分支是否落后于远程？ | [check-upstream.md](../content/aaron/basics/git/check-upstream.md) |
| Git 配置的用户名、邮箱和 SSH 密钥分别有什么用？ | [identity-ssh.md](../content/aaron/basics/git/identity-ssh.md) |

建议先熟悉常用指令、暂存与提交、功能分支、fetch/pull、merge/rebase、冲突处理和撤销提交。其他五题用于补充理解；没有为了凑数加入笔记之外的底层对象模型或复杂 Git 排错题。

笔记中的几处问题已在新答案里避开或纠正，原笔记未改动：

- `git config --list` 查看配置，SSH 克隆使用仓库地址，不是密钥内容；提交身份不等同远程认证。
- `HEAD~n` 表示沿第一父提交回溯 n 步，n 不是要保留的提交数；`reset` 默认 mixed，soft 保留暂存区。回退选择重点在于改动是否保留、历史是否已经分享，不能按“有没有 pull”简单划分。[Git reset](https://git-scm.com/docs/git-reset)
- stash 保存未提交修改，不是“暂存要丢弃的提交”；默认不含未跟踪文件，`-u` 才包含它们；pop 冲突时保留 stash。[Git stash](https://git-scm.com/docs/git-stash)
- merge 可以快进，不一定生成合并提交；rebase 改写被重放的提交，不能保证减少冲突。[Git merge](https://git-scm.com/docs/git-merge)、[Git rebase](https://git-scm.com/docs/git-rebase)
- pull 的整合方式取决于参数和配置；中止冲突操作要分清 merge 和 rebase，不能所有情况都写 merge --abort。[Git pull](https://git-scm.com/docs/git-pull)
- main/master、origin/upstream 是具体仓库配置或命名约定，不当作固定规则。

校验清单中这 12 项标记为 `user-approved-rewrite`，摘要对应本次改写答案，不再声称与原文逐字相同；其余来源记录与答案摘要保持不变。

---

本次修订验证：`npm test` 72/72 通过；`npm run build` 与归属检查通过（原用户 537 题、Aaron 126 项），仍有原有包体积警告。浏览器实测 Git 分类 12 题，搜索常用指令能展示新版回答。重启本任务启动的本地检索服务以重新加载题库；其余 114 项答案与修订前摘要一致。未改用户配置、分类逻辑或原笔记，未提交或推送。

## 首次导入历史记录（以下数量为修订前）

导入依据：用户提供的 10 份 `*-实习速背.md`，以每份文档的编号二级标题为原题边界。原文提到的 PDF 条目数量、既往合并记录不是本次拆题依据，未再次拆开复合问题。文档开头的材料说明不作为题目，文内说明仅作为资料保留，不执行其中指令。

## 配置与范围

- `content/users.json` 仅追加 Aaron（id 为 `aaron`），保留 default 的全部配置。Aaron 的 `projects` 和 `identityMarkers` 为空数组；今后添加真实项目时按既有规则登记项目名即可，未增加基础题专用用户类型、身份标记或豁免。
- 原 `content/aaron/` 只有 `.DS_Store` 与 `05-projects/.DS_Store`，未删除或覆盖。
- `src/question-bank.ts` 新增 html、css、browser、git、webpack 映射，复用已有 javascript、vue、react 映射和侧栏生成逻辑。保留 html-css 及 current-interview 的全部原有规则。
- 本次按来源归属创建八个板块；没有独立 TypeScript 或网络资料，因此未创建这些目录。浏览器资料中的网络、JavaScript、Vue 问题仍归 browser；Webpack 中 Redux、Fetch、Canvas 等仍归 webpack；HTML 中浏览器问题仍归 html。这是遵循明确来源归属的决定，而非判断这些题只能属于该学科。
- React1、React2 是资料编号，合入 react；Vue 与 Vue3 合入 vue，版本信息保留在题目和答案中。
- 每题八行属性、一行数组、一个一级题目标题、一个核心回答模块。难度按内容分级，优先级包含 high 和 normal，项目关联全部为空。
- 原答案内部逐字保留（仅去除题目与答案边界的空白）；代码、语言标识、段落和原文引导说明保留。唯一额外正文是练习占位的缺失答案标注。`tests/fixtures/aaron-basics.json` 保存逐题来源、路径与原答案 SHA-256，未复制原始资料或答案备份。
- `src/TextContent.tsx` 补充围栏代码块显示，保留代码换行、缩进和语言标识；不改题库解析器，不执行原文代码。

## 新增数量

| category | 侧栏 | 条目数 |
| --- | --- | ---: |
| html | HTML | 11 |
| css | CSS | 18 |
| javascript | JavaScript | 15 |
| vue | Vue | 23 |
| react | React | 14 |
| browser | 浏览器 | 18 |
| git | Git | 1 |
| webpack | Webpack | 15 |

合计 115 个文件：114 个有实质答案的条目，另有 1 个原文练习占位（计入 Vue 的 23 项）。没有合并、漏掉或重复输出同一个来源条目。

## 缺失答案与原文依赖

- Vue 第 16 题“练习占位”：原文明确没有具体问题或答案。输出 `vue/practice-placeholder.md` 保留原题与原说明，并加“原文未提供答案，待补充”。不把它计为已完整作答的技术题。
- HTML 第 10 题包含“可见第5题”交叉引用，原样保留。拆文件后该编号仍指原 HTML 资料第 5 题（`html/html5-features.md`），该题自身也有 SVG/Canvas 回答，没有补写或擅自改链接。

## 疑似重复及重叠

以下每个来源条目均独立保留，不合并。相同指答案文字相同；忽略纯“沿用你的回答”说明后相同的情况单独注明。主题重叠不代表整题重复。

| 来源条目 | 判断 |
| --- | --- |
| HTML #7 ↔ 浏览器 #3 | 标题相同；去除“沿用你的回答”说明后答案相同 |
| HTML #8 ↔ 浏览器 #4 | 标题相同；去除“沿用你的回答”说明后答案相同 |
| HTML #11 ↔ 浏览器 #9 ↔ JavaScript #11 | 性能优化主题重叠；浏览器版包含 HTML 答案并附解释，JavaScript 版措辞不同 |
| React1 #1 ↔ React2 #7 | 题目措辞不同，答案相同 |
| React1 #2 ↔ React2 #3 | React2 包含相同类组件答案，并补函数组件副作用 |
| React1 #3 ↔ React2 #4 | 题目措辞不同，答案相同 |
| React2 #8 ↔ Webpack #10 | 题目措辞不同，答案相同 |
| 浏览器 #1 ↔ Webpack #13 | Promise 部分相同，浏览器版另含 async/await |
| 浏览器 #18 ↔ Webpack #14 | Generator 答案相同 |
| HTML #9 ↔ JavaScript #8 | 存储主题重叠；部分口径矛盾，见下方 |
| HTML #10 ↔ Webpack #12 | Canvas/SVG 主题重叠，Webpack 版更完整 |
| Vue #14 ↔ 浏览器 #12 ↔ Vue3 #5 | key/Diff 重叠，但范围与版本不同 |
| Vue #12、#4 ↔ 浏览器 #14 | DOM、nextTick、$set 局部重叠，不能合并整题 |
| Vue #8 ↔ Vue3 #4 | computed/watch 重叠，Vue3 另含 watchEffect |
| Vue #3 ↔ Vue3 #7 | 生命周期主题重叠，版本不同 |
| Vue #4 ↔ Vue3 #3 | 响应式主题重叠，实现与版本不同 |
| Vue #6 ↔ Webpack #8 | vue-loader 局部重叠，问题主体不同 |
| CSS #3 ↔ 浏览器 #10 | 瀑布流局部重叠，CSS 为特性概览，浏览器为实现过程 |

## 原文技术问题与需谨慎理解的表述

只列核对到的问题，不改写导入答案；本次并非全量逐句技术审校。

1. **CSS #1**：`align-item` 是拼写错误，应为 `align-items`。居中是否覆盖整个屏幕还取决于父容器尺寸；table-cell 方案需区分子元素显示类型。[MDN align-items](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/align-items)
2. **CSS #3**：`gird` 应为 `grid`，`@keyframe` 应为 `@keyframes`。普通 Grid 不自动实现最短列瀑布流，原文浏览器 #10 对此更准确。原文 Ant Design Masonry 从 6.0.0 提供的说法已获官方资料支持，不标为错误。[MDN keyframes](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@keyframes)、[Ant Design Masonry](https://ant.design/components/masonry/)
3. **HTML #3**：“行元素一般不能设置左右内外边距”错误；非替换行内盒的水平方向 margin/padding 可以生效。img 等替换元素不能用普通行内文本盒的宽高规则一概说明；HTML 嵌套是否合法也不能仅按块/行分类。[MDN 盒模型](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics/Box_model)
4. **HTML #4**：代码中的 `’UTF-8’` 使用弯引号，不应作为 HTML 属性定界符直接复制，宜使用普通 ASCII 引号。原文仍保留。
5. **HTML #5**：`loaclStorage` 与 `JSON.stringfy` 拼写错误，分别应为 `localStorage` 与 `JSON.stringify`；JSON API 属于 JavaScript，不能当作 HTML5 元素能力。[MDN localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)、[MDN JSON.stringify](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify)
6. **HTML #7、浏览器 #3**：“系统/路由器缓存命中就直接展示页面”混淆 DNS 地址缓存与 HTTP 内容缓存；DNS 命中只免去对应地址查询。JS 不总是等页面渲染后才执行，解析与脚本执行顺序受脚本加载方式影响。[MDN 浏览器工作原理](https://developer.mozilla.org/en-US/docs/Web/Performance/Guides/How_browsers_work)
7. **HTML #9**：只按 Expires 判定持久 Cookie 不完整，还存在 Max-Age；会话恢复可能恢复会话 Cookie，不能保证关闭窗口即删除。Cookie 域/路径规则与 Web Storage 按源隔离不同；“不手动删 localStorage 就一直保存”和固定容量结论需要浏览器清理、隐私模式、配额等条件。JavaScript #8 已给出更细边界，两处原文均保留。[MDN Cookies](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Cookies)、[MDN localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
8. **HTML #6**：第三方插件渲染 PDF、IE/双核等描述带有历史背景，不宜当作所有现代浏览器的默认机制；未逐一核实所列厂商当前版本实现，列为待核实项。
9. **HTML #8、浏览器 #4、HTML #11**：减少回流和资源合并是可选优化思路，并非任何场景必然提速；原浏览器 #9、JavaScript #11 已提醒按协议、缓存和性能测量取舍。这里记录原文之间的范围差异，不据此替换任何答案。

## 原题与输出文件一一对应

### HTML面试题-实习速背.md

| 原编号 | 原始题目 | 输出文件 |
| ---: | --- | --- |
| 1 | 你对 HTML 语义化的理解 | [semantic-html.md](../content/aaron/basics/html/semantic-html.md) |
| 2 | DOCTYPE 的作用和标准模式、混杂模式 | [doctype-modes.md](../content/aaron/basics/html/doctype-modes.md) |
| 3 | 行内元素和块级元素有什么区别，怎么转换 | [inline-block-elements.md](../content/aaron/basics/html/inline-block-elements.md) |
| 4 | 页面乱码怎么排查 | [character-encoding.md](../content/aaron/basics/html/character-encoding.md) |
| 5 | HTML5 新增了哪些能力 | [html5-features.md](../content/aaron/basics/html/html5-features.md) |
| 6 | 你对浏览器内核的理解 | [browser-engines.md](../content/aaron/basics/html/browser-engines.md) |
| 7 | 从输入 URL 到页面显示，以及浏览器的渲染过程 | [url-rendering.md](../content/aaron/basics/html/url-rendering.md) |
| 8 | 重绘和回流的区别、触发条件，以及怎么减少 | [reflow-repaint.md](../content/aaron/basics/html/reflow-repaint.md) |
| 9 | localStorage、sessionStorage 和 Cookie 的区别 | [browser-storage.md](../content/aaron/basics/html/browser-storage.md) |
| 10 | Canvas 和 SVG 的区别 | [canvas-svg.md](../content/aaron/basics/html/canvas-svg.md) |
| 11 | 前端性能优化 | [frontend-performance.md](../content/aaron/basics/html/frontend-performance.md) |

### CSS面试题-实习速背.md

| 原编号 | 原始题目 | 输出文件 |
| ---: | --- | --- |
| 1 | 元素怎么在屏幕中间居中 | [center-element.md](../content/aaron/basics/css/center-element.md) |
| 2 | flex: 1 是哪些属性的复合属性 | [flex-shorthand.md](../content/aaron/basics/css/flex-shorthand.md) |
| 3 | CSS3 新增了哪些特性 | [css3-features.md](../content/aaron/basics/css/css3-features.md) |
| 4 | transition 和 animation 有什么区别 | [transition-animation.md](../content/aaron/basics/css/transition-animation.md) |
| 5 | 三种隐藏方式有什么区别 | [hide-elements.md](../content/aaron/basics/css/hide-elements.md) |
| 6 | CSS 怎么画三角形 | [border-triangle.md](../content/aaron/basics/css/border-triangle.md) |
| 7 | 怎么理解盒模型 | [box-model.md](../content/aaron/basics/css/box-model.md) |
| 8 | position 的取值和区别 | [position-values.md](../content/aaron/basics/css/position-values.md) |
| 9 | CSS Hack 是什么，有哪几种 | [css-hacks.md](../content/aaron/basics/css/css-hacks.md) |
| 10 | px、em 和 rem 有什么区别 | [length-units.md](../content/aaron/basics/css/length-units.md) |
| 11 | 遇到 CSS 兼容问题怎么处理 | [browser-compatibility.md](../content/aaron/basics/css/browser-compatibility.md) |
| 12 | CSS 选择器优先级怎么判断 | [selector-specificity.md](../content/aaron/basics/css/selector-specificity.md) |
| 13 | BFC 是什么，怎么触发，有哪些应用，怎么清除浮动 | [bfc-floats.md](../content/aaron/basics/css/bfc-floats.md) |
| 14 | ::after 和 :after 有什么区别 | [pseudo-element-colons.md](../content/aaron/basics/css/pseudo-element-colons.md) |
| 15 | link 和 @import 引入 CSS 有什么区别 | [link-import.md](../content/aaron/basics/css/link-import.md) |
| 16 | 雪碧图是什么，适合什么场景 | [css-sprites.md](../content/aaron/basics/css/css-sprites.md) |
| 17 | SCSS 和 Less 有什么共同点和区别 | [scss-less.md](../content/aaron/basics/css/scss-less.md) |
| 18 | CSS 属性一般按什么顺序写 | [property-order.md](../content/aaron/basics/css/property-order.md) |

### JavaScript面试题-实习速背.md

| 原编号 | 原始题目 | 输出文件 |
| ---: | --- | --- |
| 1 | 深拷贝和浅拷贝有什么区别，怎么选择 | [deep-shallow-copy.md](../content/aaron/basics/javascript/deep-shallow-copy.md) |
| 2 | ES6 有哪些新特性，var、let、const 和作用域怎么理解 | [es6-scope.md](../content/aaron/basics/javascript/es6-scope.md) |
| 3 | 原型、原型链和继承怎么联系起来理解 | [prototypes-inheritance.md](../content/aaron/basics/javascript/prototypes-inheritance.md) |
| 4 | == 和 === 有什么区别 | [equality-operators.md](../content/aaron/basics/javascript/equality-operators.md) |
| 5 | this 怎么判断，call、apply、bind 有什么区别 | [this-binding.md](../content/aaron/basics/javascript/this-binding.md) |
| 6 | 闭包是什么，和垃圾回收、内存泄漏有什么关系 | [closures-memory.md](../content/aaron/basics/javascript/closures-memory.md) |
| 7 | JS 有哪些数据类型，怎么判断，null 和 undefined 有什么区别 | [data-types.md](../content/aaron/basics/javascript/data-types.md) |
| 8 | Cookie、localStorage 和 sessionStorage 怎么选 | [storage-selection.md](../content/aaron/basics/javascript/storage-selection.md) |
| 9 | 你了解哪些设计模式 | [design-patterns.md](../content/aaron/basics/javascript/design-patterns.md) |
| 10 | 跨域为什么发生，有哪些解决方式 | [cross-origin.md](../content/aaron/basics/javascript/cross-origin.md) |
| 11 | 前端有哪些页面优化方法 | [page-performance.md](../content/aaron/basics/javascript/page-performance.md) |
| 12 | Ajax 怎么发请求，readyState 和 HTTP 状态码有什么区别 | [ajax-status.md](../content/aaron/basics/javascript/ajax-status.md) |
| 13 | JS 里有哪些异步任务 | [async-tasks.md](../content/aaron/basics/javascript/async-tasks.md) |
| 14 | map、forEach、for...in 和 for...of 怎么选择 | [iteration-methods.md](../content/aaron/basics/javascript/iteration-methods.md) |
| 15 | 数组和字符串有哪些常用方法 | [array-string-methods.md](../content/aaron/basics/javascript/array-string-methods.md) |

### Git面试题-实习速背.md

| 原编号 | 原始题目 | 输出文件 |
| ---: | --- | --- |
| 1 | Git 是什么，日常提交、分支协作和冲突怎么处理 | [git-workflow.md](../content/aaron/basics/git/git-workflow.md) |

### React1面试题-实习速背.md

| 原编号 | 原始题目 | 输出文件 |
| ---: | --- | --- |
| 1 | 虚拟 DOM、Diff 和 key 怎么理解，为什么使用它们 | [virtual-dom-diff-key.md](../content/aaron/basics/react/virtual-dom-diff-key.md) |
| 2 | React 类组件的生命周期 | [class-lifecycle.md](../content/aaron/basics/react/class-lifecycle.md) |
| 3 | React 合成事件和原生事件的关系 | [synthetic-native-events.md](../content/aaron/basics/react/synthetic-native-events.md) |

### React2面试题-实习速背.md

| 原编号 | 原始题目 | 输出文件 |
| ---: | --- | --- |
| 1 | JSX 是什么，和 JavaScript、HTML 有什么关系 | [jsx-syntax.md](../content/aaron/basics/react/jsx-syntax.md) |
| 2 | Redux 是什么，数据流、React 接入和优缺点 | [redux-data-flow.md](../content/aaron/basics/react/redux-data-flow.md) |
| 3 | React 类组件生命周期，以及函数组件如何处理副作用 | [class-lifecycle-effects.md](../content/aaron/basics/react/class-lifecycle-effects.md) |
| 4 | React 事件机制和原生 DOM 事件流的区别 | [event-dom-flow.md](../content/aaron/basics/react/event-dom-flow.md) |
| 5 | Hooks 解决什么问题，常用 Hooks 怎么用 | [hooks-usage.md](../content/aaron/basics/react/hooks-usage.md) |
| 6 | 高阶组件 HOC 是什么，和 Render Props、Hooks 有什么区别 | [hoc-render-props.md](../content/aaron/basics/react/hoc-render-props.md) |
| 7 | key 的作用、虚拟 DOM 和真实 DOM 的区别 | [key-virtual-real-dom.md](../content/aaron/basics/react/key-virtual-real-dom.md) |
| 8 | Redux 中间件、Thunk 和 Saga 怎么处理异步 | [redux-async-middleware.md](../content/aaron/basics/react/redux-async-middleware.md) |
| 9 | React 组件之间怎么通信 | [component-communication.md](../content/aaron/basics/react/component-communication.md) |
| 10 | HashRouter 和 BrowserRouter 有什么区别 | [router-modes.md](../content/aaron/basics/react/router-modes.md) |
| 11 | MobX 的状态管理和几个常用 API | [mobx-state.md](../content/aaron/basics/react/mobx-state.md) |

### Vue面试题-实习速背.md

| 原编号 | 原始题目 | 输出文件 |
| ---: | --- | --- |
| 1 | Vue 和 React 有什么区别 | [vue-react.md](../content/aaron/basics/vue/vue-react.md) |
| 2 | 组件的 data 为什么写成函数，为什么避免属性和方法重名 | [component-data-function.md](../content/aaron/basics/vue/component-data-function.md) |
| 3 | Vue 生命周期和父子组件执行顺序 | [parent-child-lifecycle.md](../content/aaron/basics/vue/parent-child-lifecycle.md) |
| 4 | Vue 2 响应式和渲染流程，为什么新增属性不更新 | [vue2-reactivity-rendering.md](../content/aaron/basics/vue/vue2-reactivity-rendering.md) |
| 5 | MVVM 和 MVC 有什么区别 | [mvvm-mvc.md](../content/aaron/basics/vue/mvvm-mvc.md) |
| 6 | Vue 怎么创建组件，Vue.extend、Vue.component 和 vue-loader 分别做什么 | [component-registration.md](../content/aaron/basics/vue/component-registration.md) |
| 7 | Vue 组件之间怎么通信 | [component-communication.md](../content/aaron/basics/vue/component-communication.md) |
| 8 | computed 和 watch 怎么选，deep 和 immediate 有什么作用 | [computed-watch.md](../content/aaron/basics/vue/computed-watch.md) |
| 9 | Vue 常见指令、v-if 和 v-show，以及修饰符 | [directives-modifiers.md](../content/aaron/basics/vue/directives-modifiers.md) |
| 10 | Vue Router、两种路由模式、路由守卫和 keep-alive | [router-guards-cache.md](../content/aaron/basics/vue/router-guards-cache.md) |
| 11 | v-model 的原理是什么 | [v-model.md](../content/aaron/basics/vue/v-model.md) |
| 12 | Vue 怎么操作 DOM，自定义指令什么时候用 | [dom-custom-directives.md](../content/aaron/basics/vue/dom-custom-directives.md) |
| 13 | Vuex 是什么，数据怎么流转 | [vuex-data-flow.md](../content/aaron/basics/vue/vuex-data-flow.md) |
| 14 | Vue 的 Diff、key 和性能优化怎么理解 | [vue-diff-key-performance.md](../content/aaron/basics/vue/vue-diff-key-performance.md) |
| 15 | 项目出现视图不更新、报错或动态表单校验问题，怎么排查 | [view-form-debugging.md](../content/aaron/basics/vue/view-form-debugging.md) |
| 16 | 练习占位 | [practice-placeholder.md](../content/aaron/basics/vue/practice-placeholder.md) |

### Vue3面试题-实习速背.md

| 原编号 | 原始题目 | 输出文件 |
| ---: | --- | --- |
| 1 | Vue 3 相比 Vue 2 有哪些变化，为什么更新更高效 | [vue3-changes.md](../content/aaron/basics/vue/vue3-changes.md) |
| 2 | Options API、Composition API 和 script setup 有什么关系 | [composition-script-setup.md](../content/aaron/basics/vue/composition-script-setup.md) |
| 3 | Vue 3 响应式怎么实现，ref 和 reactive 有什么区别 | [vue3-reactivity-ref-reactive.md](../content/aaron/basics/vue/vue3-reactivity-ref-reactive.md) |
| 4 | watch、watchEffect 和 computed 怎么选择 | [watch-effect-computed.md](../content/aaron/basics/vue/watch-effect-computed.md) |
| 5 | v-for、v-if 的优先级，以及 Vue 2 和 Vue 3 的 Diff 区别 | [vue3-directive-diff.md](../content/aaron/basics/vue/vue3-directive-diff.md) |
| 6 | Pinia 是什么，和 Vuex 有什么区别 | [pinia-vuex.md](../content/aaron/basics/vue/pinia-vuex.md) |
| 7 | Vue 3 生命周期怎么用 | [vue3-lifecycle.md](../content/aaron/basics/vue/vue3-lifecycle.md) |

### 浏览器面试题-实习速背.md

| 原编号 | 原始题目 | 输出文件 |
| ---: | --- | --- |
| 1 | Promise、async 和 await 怎么理解 | [promise-async-await.md](../content/aaron/basics/browser/promise-async-await.md) |
| 2 | 浏览器事件循环怎么执行，和 Node.js 有什么区别 | [event-loop-node.md](../content/aaron/basics/browser/event-loop-node.md) |
| 3 | 从输入 URL 到页面显示，以及浏览器的渲染过程 | [url-rendering.md](../content/aaron/basics/browser/url-rendering.md) |
| 4 | 重绘和回流的区别、触发条件，以及怎么减少 | [reflow-repaint.md](../content/aaron/basics/browser/reflow-repaint.md) |
| 5 | HTTP 强缓存和协商缓存怎么工作 | [http-cache.md](../content/aaron/basics/browser/http-cache.md) |
| 6 | HTTP 请求方法有哪些，GET 和 POST 有什么区别 | [http-methods.md](../content/aaron/basics/browser/http-methods.md) |
| 7 | HTTP 和 HTTPS 有什么区别 | [http-https.md](../content/aaron/basics/browser/http-https.md) |
| 8 | TCP 三次握手、四次挥手，以及为什么次数不同 | [tcp-handshake-close.md](../content/aaron/basics/browser/tcp-handshake-close.md) |
| 9 | 前端性能优化 | [frontend-performance.md](../content/aaron/basics/browser/frontend-performance.md) |
| 10 | 瀑布流布局怎么实现 | [masonry-layout.md](../content/aaron/basics/browser/masonry-layout.md) |
| 11 | 项目怎么搭建，以及从开发到上线的大致流程 | [project-delivery.md](../content/aaron/basics/browser/project-delivery.md) |
| 12 | Vue 中 key 有什么作用 | [vue-key.md](../content/aaron/basics/browser/vue-key.md) |
| 13 | scoped 的作用和原理，怎么使用 deep | [vue-scoped-deep.md](../content/aaron/basics/browser/vue-scoped-deep.md) |
| 14 | ref、nextTick 和 $set 分别解决什么问题 | [vue-ref-nexttick-set.md](../content/aaron/basics/browser/vue-ref-nexttick-set.md) |
| 15 | XSS 和 CSRF 有什么区别，怎么防范 | [xss-csrf.md](../content/aaron/basics/browser/xss-csrf.md) |
| 16 | 事件捕获、冒泡和委托是什么，怎么阻止 | [event-propagation.md](../content/aaron/basics/browser/event-propagation.md) |
| 17 | 防抖和节流有什么区别，适合哪些场景 | [debounce-throttle.md](../content/aaron/basics/browser/debounce-throttle.md) |
| 18 | Generator 怎么暂停和恢复执行 | [generator-execution.md](../content/aaron/basics/browser/generator-execution.md) |

### Webpack面试题-实习速背.md

| 原编号 | 原始题目 | 输出文件 |
| ---: | --- | --- |
| 1 | Webpack 是什么，和 Grunt、Gulp、Rollup、Parcel 怎么比较 | [bundler-comparison.md](../content/aaron/basics/webpack/bundler-comparison.md) |
| 2 | Loader 和 Plugin 有什么区别，常见的有哪些 | [loader-plugin.md](../content/aaron/basics/webpack/loader-plugin.md) |
| 3 | Webpack 构建流程是什么，编写 Loader 或 Plugin 的思路 | [build-pipeline.md](../content/aaron/basics/webpack/build-pipeline.md) |
| 4 | Webpack 热更新 HMR 怎么实现 | [hot-module-replacement.md](../content/aaron/basics/webpack/hot-module-replacement.md) |
| 5 | 怎么优化 Webpack 的产物和构建速度 | [build-optimization.md](../content/aaron/basics/webpack/build-optimization.md) |
| 6 | 单页应用和多页应用怎么配置 | [spa-mpa.md](../content/aaron/basics/webpack/spa-mpa.md) |
| 7 | 发布 npm 包时要注意什么，Webpack 怎么配合 | [npm-library-publishing.md](../content/aaron/basics/webpack/npm-library-publishing.md) |
| 8 | Vue 的按需加载，以及 Webpack 怎么解析 .vue | [vue-lazy-loading.md](../content/aaron/basics/webpack/vue-lazy-loading.md) |
| 9 | Fetch 和 Axios 有什么区别 | [fetch-axios.md](../content/aaron/basics/webpack/fetch-axios.md) |
| 10 | Redux 怎么处理异步请求 | [redux-async.md](../content/aaron/basics/webpack/redux-async.md) |
| 11 | class 和构造函数有什么区别，静态方法是什么 | [class-constructors.md](../content/aaron/basics/webpack/class-constructors.md) |
| 12 | Canvas 和 SVG 有什么区别 | [canvas-svg.md](../content/aaron/basics/webpack/canvas-svg.md) |
| 13 | Promise 的状态、链式调用和组合方法 | [promise-combinators.md](../content/aaron/basics/webpack/promise-combinators.md) |
| 14 | Generator 和 yield、next 怎么理解 | [generator-yield-next.md](../content/aaron/basics/webpack/generator-yield-next.md) |
| 15 | Babel 的作用、原理和常见配置 | [babel-pipeline.md](../content/aaron/basics/webpack/babel-pipeline.md) |

## 验证结果

- 独立重新读取十份源文件，按原编号定位每段答案，与 115 个输出逐一比较：标题和答案全部一致（仅忽略边界空白；占位项扣除显式待补充标记后比较）。摘要回归检查同时通过。
- `npm test`：72/72 通过，包含新增完整性、分类计数、未来项目登记和归属拒绝检查。
- `npm run build`：通过；构建前归属检查显示 default 537 题、Aaron 115 条。产物仍采用全量 eager 题库加载，主 JS 约 2.52 MB，gzip 约 952 KB，Vite 提示大于 500 KB；未放宽警告阈值或顺带重构加载策略。
- `npm run test:e2e`：15/15 通过。首次运行发现原测试要求没有用户切换按钮，这与新增用户需求冲突；改为断言“切换用户，当前：牛”可见，保留搜索、拼音、分类及原用户答案断言。单元测试中“仅有 default”断言也更新为两个独立题库，没有删除测试或放宽归属校验。
- 真实浏览器：从头像菜单选择 Aaron（115 条），逐一点击八个侧栏按钮，列表数量分别为 HTML 11、CSS 18、JavaScript 15、Vue 23、React 14、浏览器 18、Git 1、Webpack 15，逐条列表标签均属于选中板块。HTML、CSS 同时以独立按钮显示。刷新后仍选中 Aaron。
- 搜索“CSS 怎么画三角形”显示对应题目和完整核心回答；代码 DOM 文本与源代码逐字符相同，`language-css`、换行及缩进保留，已检查截图。检索服务 `/api/health` 返回 semantic ready。未配置 DeepSeek 生成，未验证外部模型生成或发起外部模型请求。
- 页面初次打开时本地 API 尚未启动，出现健康检查 502；启动现有 API 后恢复 ready。favicon 404 属于现有资源缺失，本次未顺带修改。
- 原用户配置和 `content/default/` 全部文件与任务开始 HEAD 逐字节比较一致，原用户仍是 537 题；其 HTML / CSS 分组和特殊面试分类保持原样。
- `git diff --check` 通过；没有修改题库解析器，没有引入临时导入脚本、源资料备份、构建产物或非题目 Markdown 到 content。报告与校验清单位于 docs 和 tests，导入脚本、运行日志及截图留在系统临时目录。
- 本地页面运行在 http://127.0.0.1:4175/，API 在 3001。5173 被其他项目占用，因此另选端口，没有终止既有进程。
- 当前分支 `codex/aaron-basic-question-bank`，改动未提交、未推送、未创建 PR、未部署。
