# Aaron 项目题库接入

按用户 2026-09-10“提交并合并在我的 fork 仓库”的授权，将已交付的项目题库接入现有 Aaron 用户。

- 保留 154 项基础题，新增拾光集 59 题（普通 27 / 追问 32）、映刻 75 题（29 / 46）、云枢 60 题（32 / 28），Aaron 合计 348 项。
- 仅向 Aaron 的项目白名单添加三个真实项目名称，保留其他用户与身份配置；不放宽归属校验。
- 新增 shiguang → 拾光集移动商城系统、yingke → 映刻影视、yunshu → 云枢智慧城市数据平台三个中文分类映射。
- 项目题文件与已交付目录逐字一致；来源、原题标题和答案/依据 SHA-256 记录在 tests/fixtures/aaron-projects.json。

## 保留的原文问题和边界

- 映刻追问声明 45 题，实际编号到 46，保留全部 46 题及原始【高频】标记。
- 拾光集前言的搜索历史问答独立保留，因此 31 道编号题之外还有 1 道未编号追问。
- 映刻与云枢带独立答案的模块速记作为普通题；映刻模块速记缺代码依据，按模板标注待补充。没有缺失答案。
- 文档级复习顺序、作答建议及没有独立问答引导的拾光集模块清单未拆成题目。
- 拾光集 SKU 不足题的答案描述新键值匹配，依据仍描述旧字符串匹配，原文矛盾保留，未擅自修正。
- 拾光集价格口径、线上部署，以及各项目后端实现、测试和性能结论仅为来源陈述，本次没有执行这些业务项目或核实后端、线上环境。
- 同名跨项目题目及普通/亮点/难点/不足/追问中的考点重叠均保留，不静默合并。
- 原始源码绝对路径与行号保留，其他机器不能保证可打开。

## 接入验证

- `npm test`：74/74 通过，包含原始答案摘要、项目归属、分类数量、搜索及现有功能测试。
- `npm run test:e2e`：15/15 通过。
- `npm run build`：通过；题库内容增加后 JS 约 3.00 MB、gzip 1.07 MB，仍有大包警告，未调高阈值。
- 真实浏览器显示 Aaron 共 348 题；分别点击三个中文项目分类，列表数为 59、75、60，并搜索打开商品对比亮点、映刻日志追问、云枢 Token 并发刷新亮点，回答显示正确。
- 本项目 API 已重新加载题库，本地页面为 http://127.0.0.1:4175/。
- 194 个项目题目与此前交付文件逐字一致，牛的原题库未修改，`git diff --check` 通过。

## 项目动机与分工补充

新增三道 normal/motivation-team.md，题目均为“你为什么做这个项目，这个项目是几个人做的”。项目题共 197 道，Aaron 总数 351；拾光集 60、映刻 76、云枢 61。

团队口径由用户明确提供：拾光集与云枢均为两人合作，Aaron 负责前端，另一位同学负责后端；映刻为独立前端项目，使用豆瓣 API，未自行开发后端。拾光集动机基于用户给出的“学习 Vue 3 时用常见移动商城练手”展开；云枢“学习 React 后想串联知识，并对地图图表感兴趣”的契机已经用户认可；映刻的 uni-app 练习动机为根据项目范围拟定的表述。随后按用户要求，小幅展开三个回答中的选题原因、具体练习目标和团队分工，未新增客户需求或联调经历。没有编造真实客户、合作单位、开发时间或后端源码证据。新题按模板标注缺失代码依据，团队人数与动机本身应以用户陈述为准。

## 个人情况补充

另新增 personal 分类“个人情况”两题：学习路线、Vue 2 练手项目未列入简历的原因。回答采用用户确认的版本，明确先学 Vue 2 并做增删改查项目，再学小程序；未虚构项目名称或开发时间。Aaron 当前共 353 题（基础 154、项目 197、个人情况 2）。分类筛选和搜索检查通过，74 项测试与构建通过，仍有既有大包警告。

## 来源对应

| 原文 | 原标题 | 文件 |
| --- | --- | --- |
| 拾光集移动商城系统-代码设计追问与回答-口语重构版.md:9 | 先搞清楚：练习版到底把什么放在浏览器存储里 | [题目](../content/aaron/shiguang/followups/search-history-storage.md) |
| 拾光集移动商城系统-代码设计追问与回答-口语重构版.md:25 | 1. AI Key 为什么放在 localStorage？为什么不用 sessionStorage、Cookie 或环境变量？ | [题目](../content/aaron/shiguang/followups/ai-key-storage.md) |
| 拾光集移动商城系统-代码设计追问与回答-口语重构版.md:42 | 2. AI Key 已经移到服务端，登录 Token 为什么还放在 localStorage？Cookie 会不会更好？ | [题目](../content/aaron/shiguang/followups/token-cookie.md) |
| 拾光集移动商城系统-代码设计追问与回答-口语重构版.md:58 | 3. AES 加密具体是怎么做的？密钥长度、模式和填充是什么？ | [题目](../content/aaron/shiguang/followups/aes-format.md) |
| 拾光集移动商城系统-代码设计追问与回答-口语重构版.md:70 | 4. 为什么用 AES，不用 RSA、MD5 或 SHA-256？有 HTTPS 还需要前端加密吗？ | [题目](../content/aaron/shiguang/followups/aes-alternatives.md) |
| 拾光集移动商城系统-代码设计追问与回答-口语重构版.md:85 | 5. 为什么使用 ECB，不用 CBC 或 GCM？加上时间戳能防重放吗？ | [题目](../content/aaron/shiguang/followups/ecb-replay.md) |
| 拾光集移动商城系统-代码设计追问与回答-口语重构版.md:99 | 6. 路由守卫判断有 Token 就放行，算完成鉴权了吗？退出登录做了什么？ | [题目](../content/aaron/shiguang/followups/route-auth.md) |
| 拾光集移动商城系统-代码设计追问与回答-口语重构版.md:114 | 7. 前端密码校验和后端校验分别负责什么？为什么可能注册成功却被登录页拦住？ | [题目](../content/aaron/shiguang/followups/password-validation.md) |
| 拾光集移动商城系统-代码设计追问与回答-口语重构版.md:128 | 8. 商品详情用了 v-html，会有 XSS 吗？调整图片尺寸算不算过滤？ | [题目](../content/aaron/shiguang/followups/rich-text-xss.md) |
| 拾光集移动商城系统-代码设计追问与回答-口语重构版.md:144 | 9. AI Key 藏到服务端以后就安全了吗？别人直接请求 /api/ai 怎么办？ | [题目](../content/aaron/shiguang/followups/ai-proxy-auth.md) |
| 拾光集移动商城系统-代码设计追问与回答-口语重构版.md:159 | 10. 前端已经做了防抖，为什么服务端还要限流？内存 Map 能管住所有请求吗？ | [题目](../content/aaron/shiguang/followups/server-rate-limit.md) |
| 拾光集移动商城系统-代码设计追问与回答-口语重构版.md:174 | 11. AI 卖点是真模型生成还是写死的？三层降级和个性化怎么解释？ | [题目](../content/aaron/shiguang/followups/ai-fallback.md) |
| 拾光集移动商城系统-代码设计追问与回答-口语重构版.md:189 | 12. 搜索为什么使用防抖，不用节流？500ms 是怎么定的？ | [题目](../content/aaron/shiguang/followups/debounce-delay.md) |
| 拾光集移动商城系统-代码设计追问与回答-口语重构版.md:204 | 13. 已经有防抖，为什么还要请求版本号？cancel 真的取消请求了吗？ | [题目](../content/aaron/shiguang/followups/request-version.md) |
| 拾光集移动商城系统-代码设计追问与回答-口语重构版.md:221 | 14. 商城使用 Axios，为什么 AI 使用 fetch？12 秒和 15 秒超时有什么区别？ | [题目](../content/aaron/shiguang/followups/axios-fetch-timeout.md) |
| 拾光集移动商城系统-代码设计追问与回答-口语重构版.md:238 | 15. 首页为什么用 Promise.allSettled，不用 Promise.all 或三个 await？ | [题目](../content/aaron/shiguang/followups/all-settled-home.md) |
| 拾光集移动商城系统-代码设计追问与回答-口语重构版.md:255 | 16. 购物车全选、店铺全选和半选，为什么不用几个独立布尔值？computed 和 watch 分别做什么？ | [题目](../content/aaron/shiguang/followups/cart-derived-state.md) |
| 拾光集移动商城系统-代码设计追问与回答-口语重构版.md:270 | 17. 总价为什么交给服务端计算？前端相加不行吗？连续勾选怎样避免旧价格覆盖？ | [题目](../content/aaron/shiguang/followups/server-pricing.md) |
| 拾光集移动商城系统-代码设计追问与回答-口语重构版.md:286 | 18. 修改数量为什么使用 before-change？为什么传新旧差值，不直接传目标数量？ | [题目](../content/aaron/shiguang/followups/quantity-before-change.md) |
| 拾光集移动商城系统-代码设计追问与回答-口语重构版.md:298 | 19. SKU 为什么用 Set 收集规格？把规格拼成字符串匹配有什么问题？ | [题目](../content/aaron/shiguang/followups/sku-set-matching.md) |
| 拾光集移动商城系统-代码设计追问与回答-口语重构版.md:315 | 20. 为什么使用 rem，不直接使用 vw 或 px？750、75、375 和 10rem 是什么关系？ | [题目](../content/aaron/shiguang/followups/rem-units.md) |
| 拾光集移动商城系统-代码设计追问与回答-口语重构版.md:332 | 21. Vant 已经有 Skeleton，为什么还要封装 SkeletonList？骨架屏提升了什么？ | [题目](../content/aaron/shiguang/followups/skeleton-wrapper.md) |
| 拾光集移动商城系统-代码设计追问与回答-口语重构版.md:348 | 22. 为什么需要同源代理和图片代理？直接改地址不行吗？会不会成为开放代理？ | [题目](../content/aaron/shiguang/followups/proxy-boundary.md) |
| 拾光集移动商城系统-代码设计追问与回答-口语重构版.md:366 | 23. 确认订单为什么使用 sessionStorage，不用 localStorage 或 Pinia？刷新和换账号怎么办？ | [题目](../content/aaron/shiguang/followups/checkout-storage.md) |
| 拾光集移动商城系统-代码设计追问与回答-口语重构版.md:383 | 24. 项目使用了 TypeScript，为什么还有 any？写了类型就能保证接口数据正确吗？ | [题目](../content/aaron/shiguang/followups/typescript-runtime.md) |
| 拾光集移动商城系统-代码设计追问与回答-口语重构版.md:400 | 25. 用户怎么使用对比功能？为什么只保存商品和规格 ID？ | [题目](../content/aaron/shiguang/followups/comparison-ids.md) |
| 拾光集移动商城系统-代码设计追问与回答-口语重构版.md:409 | 26. 从两双鞋扩展到所有商品，怎么处理不同规格？ | [题目](../content/aaron/shiguang/followups/comparison-attributes.md) |
| 拾光集移动商城系统-代码设计追问与回答-口语重构版.md:418 | 27. 列表显示 0.01 元时，你怎么做价格比较？ | [题目](../content/aaron/shiguang/followups/price-basis.md) |
| 拾光集移动商城系统-代码设计追问与回答-口语重构版.md:429 | 28. 怎么尽量避免 AI 编造商品参数？为什么服务端还要再查一次商品？ | [题目](../content/aaron/shiguang/followups/ai-grounding.md) |
| 拾光集移动商城系统-代码设计追问与回答-口语重构版.md:440 | 29. 流式输出难在哪里？收到一块数据就直接解析 JSON 不行吗？ | [题目](../content/aaron/shiguang/followups/stream-framing.md) |
| 拾光集移动商城系统-代码设计追问与回答-口语重构版.md:451 | 30. 已经取消请求了，为什么还要检查版本号？ | [题目](../content/aaron/shiguang/followups/abort-version.md) |
| 拾光集移动商城系统-代码设计追问与回答-口语重构版.md:462 | 31. 这个功能上线时做了什么处理？还有哪些可以改进？ | [题目](../content/aaron/shiguang/followups/comparison-deployment.md) |
| 拾光集移动商城系统-项目面试稿-口语重构版.md:9 | 一、项目介绍（约 1 分半到 2 分钟） | [题目](../content/aaron/shiguang/normal/project-overview.md) |
| 拾光集移动商城系统-项目面试稿-口语重构版.md:42 | 1. 移动端适配 | [题目](../content/aaron/shiguang/normal/mobile-adaptation.md) |
| 拾光集移动商城系统-项目面试稿-口语重构版.md:60 | 2. 网络请求封装 | [题目](../content/aaron/shiguang/normal/request-wrapper.md) |
| 拾光集移动商城系统-项目面试稿-口语重构版.md:78 | 3. 注册登录和路由鉴权 | [题目](../content/aaron/shiguang/normal/login-route-guard.md) |
| 拾光集移动商城系统-项目面试稿-口语重构版.md:96 | 4. 首页数据加载和骨架屏 | [题目](../content/aaron/shiguang/normal/home-loading.md) |
| 拾光集移动商城系统-项目面试稿-口语重构版.md:114 | 5. AI 搜索联想和商品卖点 | [题目](../content/aaron/shiguang/normal/ai-suggestions.md) |
| 拾光集移动商城系统-项目面试稿-口语重构版.md:139 | 6. 购物车 | [题目](../content/aaron/shiguang/normal/shopping-cart.md) |
| 拾光集移动商城系统-项目面试稿-口语重构版.md:162 | 1. 分类和搜索 | [题目](../content/aaron/shiguang/normal/category-search.md) |
| 拾光集移动商城系统-项目面试稿-口语重构版.md:179 | 2. 商品详情和 SKU | [题目](../content/aaron/shiguang/normal/product-sku.md) |
| 拾光集移动商城系统-项目面试稿-口语重构版.md:196 | 3. 地址管理 | [题目](../content/aaron/shiguang/normal/address-management.md) |
| 拾光集移动商城系统-项目面试稿-口语重构版.md:213 | 4. 确认订单和订单列表 | [题目](../content/aaron/shiguang/normal/order-flow.md) |
| 拾光集移动商城系统-项目面试稿-口语重构版.md:230 | 5. 部署代理和旧图片处理 | [题目](../content/aaron/shiguang/normal/proxy-images.md) |
| 拾光集移动商城系统-项目面试稿-口语重构版.md:251 | 亮点一：商品对比与流式选购助手 | [题目](../content/aaron/shiguang/normal/product-comparison.md) |
| 拾光集移动商城系统-项目面试稿-口语重构版.md:268 | 亮点二：购物车只接受最新一次计价结果 | [题目](../content/aaron/shiguang/normal/latest-cart-price.md) |
| 拾光集移动商城系统-项目面试稿-口语重构版.md:285 | 难点一：搜索建议既要减少请求，也要防止旧结果覆盖新输入 | [题目](../content/aaron/shiguang/normal/search-race.md) |
| 拾光集移动商城系统-项目面试稿-口语重构版.md:302 | 难点二：桌面上保持手机宽度时，不能让 rem 被换算两次 | [题目](../content/aaron/shiguang/normal/rem-conversion.md) |
| 拾光集移动商城系统-项目面试稿-口语重构版.md:320 | 难点三：流式回答要正确拼接，也要能停止和重新生成 | [题目](../content/aaron/shiguang/normal/stream-lifecycle.md) |
| 拾光集移动商城系统-项目面试稿-口语重构版.md:338 | 难点四：不同商品的规格和价格，不能直接放在一起就算对比 | [题目](../content/aaron/shiguang/normal/comparison-semantics.md) |
| 拾光集移动商城系统-项目面试稿-口语重构版.md:360 | 1. AI 限流还不是全站配额 | [题目](../content/aaron/shiguang/normal/rate-limit-gap.md) |
| 拾光集移动商城系统-项目面试稿-口语重构版.md:374 | 2. 登录校验规则和登录态处理还需要统一 | [题目](../content/aaron/shiguang/normal/auth-rules-gap.md) |
| 拾光集移动商城系统-项目面试稿-口语重构版.md:390 | 3. 前端 AES 和商品富文本仍有安全边界 | [题目](../content/aaron/shiguang/normal/security-boundaries.md) |
| 拾光集移动商城系统-项目面试稿-口语重构版.md:406 | 4. 购物车计价失败后，结算按钮状态不够完整 | [题目](../content/aaron/shiguang/normal/pricing-error-state.md) |
| 拾光集移动商城系统-项目面试稿-口语重构版.md:421 | 5. SKU 选择还没有完整处理无效组合和库存 | [题目](../content/aaron/shiguang/normal/sku-options-gap.md) |
| 拾光集移动商城系统-项目面试稿-口语重构版.md:436 | 6. AI 文案和订单结果还需要更严格的业务校验 | [题目](../content/aaron/shiguang/normal/business-validation-gap.md) |
| 拾光集移动商城系统-项目面试稿-口语重构版.md:452 | 7. 部署和代理还不能说成全部验证完成 | [题目](../content/aaron/shiguang/normal/deployment-verification-gap.md) |
| 拾光集移动商城系统-项目面试稿-口语重构版.md:465 | 8. 普通搜索和新增地址的重复操作还没有处理完整，可以怎么改？ | [题目](../content/aaron/shiguang/normal/duplicate-actions-gap.md) |
| 拾光集移动商城系统-项目面试稿-口语重构版.md:481 | 七、怎么验证这些功能 | [题目](../content/aaron/shiguang/normal/verification-methods.md) |
| 映刻影视-面试官追问题库-口语重构版.md:9 | 1. 【高频】uni-app 已经有 `uni.request`，为什么还要使用 Axios？ | [题目](../content/aaron/yingke/followups/axios-choice.md) |
| 映刻影视-面试官追问题库-口语重构版.md:22 | 2. 【高频】为什么自己实现 adapter？项目里不是还安装了 `axios-miniprogram` 吗？ | [题目](../content/aaron/yingke/followups/adapter-choice.md) |
| 映刻影视-面试官追问题库-口语重构版.md:35 | 3. 【高频】这个自定义 adapter 是完整实现吗？ | [题目](../content/aaron/yingke/followups/adapter-coverage.md) |
| 映刻影视-面试官追问题库-口语重构版.md:48 | 4. 【高频】请求拦截器和响应拦截器分别做了什么？ | [题目](../content/aaron/yingke/followups/interceptors.md) |
| 映刻影视-面试官追问题库-口语重构版.md:61 | 5. HTTP 404、500 会进入响应错误拦截器吗？ | [题目](../content/aaron/yingke/followups/http-errors.md) |
| 映刻影视-面试官追问题库-口语重构版.md:74 | 6. 为什么 `baseURL` 和超时时间写在请求文件里？ | [题目](../content/aaron/yingke/followups/request-config.md) |
| 映刻影视-面试官追问题库-口语重构版.md:86 | 7. `uni.promisify.adaptor.js` 和 Axios adapter 是一回事吗？ | [题目](../content/aaron/yingke/followups/promisify-adapter.md) |
| 映刻影视-面试官追问题库-口语重构版.md:100 | 8. 如果页面离开时请求还没有结束，怎么处理？ | [题目](../content/aaron/yingke/followups/request-unload.md) |
| 映刻影视-面试官追问题库-口语重构版.md:117 | 9. 【高频】为什么使用 `Promise.allSettled`，不用 `Promise.all`？ | [题目](../content/aaron/yingke/followups/all-settled-choice.md) |
| 映刻影视-面试官追问题库-口语重构版.md:129 | 10. 如果三个分类中的一个请求失败，另外两个还能显示吗？ | [题目](../content/aaron/yingke/followups/partial-failure.md) |
| 映刻影视-面试官追问题库-口语重构版.md:142 | 11. 【高频】为什么组件接收的是 `main.value`，而不是直接接收分类数据？ | [题目](../content/aaron/yingke/followups/component-data.md) |
| 映刻影视-面试官追问题库-口语重构版.md:155 | 12. 首页为什么拆成三个请求函数，不直接写一个循环？ | [题目](../content/aaron/yingke/followups/category-functions.md) |
| 映刻影视-面试官追问题库-口语重构版.md:170 | 13. 【高频】为什么列表初始化放在 `onShow`，不用 `onLoad`？ | [题目](../content/aaron/yingke/followups/onshow-onload.md) |
| 映刻影视-面试官追问题库-口语重构版.md:183 | 14. 【高频】触底分页怎么防止连续触发和重复请求？ | [题目](../content/aaron/yingke/followups/pagination-lock.md) |
| 映刻影视-面试官追问题库-口语重构版.md:196 | 15. 为什么用 `start/count`，不用 `page/pageSize`？ | [题目](../content/aaron/yingke/followups/offset-pagination.md) |
| 映刻影视-面试官追问题库-口语重构版.md:209 | 16. 【高频】为什么 loading 会立即消失？ | [题目](../content/aaron/yingke/followups/loading-lifetime.md) |
| 映刻影视-面试官追问题库-口语重构版.md:221 | 17. 到底条件为什么不能只判断 `start < total`？ | [题目](../content/aaron/yingke/followups/end-condition.md) |
| 映刻影视-面试官追问题库-口语重构版.md:236 | 18. 从详情页返回后怎样保留原来的滚动位置和列表？ | [题目](../content/aaron/yingke/followups/list-restore.md) |
| 映刻影视-面试官追问题库-口语重构版.md:251 | 19. 【高频】为什么列表的 `key` 使用 `index`，不用影片 ID？ | [题目](../content/aaron/yingke/followups/list-key.md) |
| 映刻影视-面试官追问题库-口语重构版.md:264 | 20. 为什么 `props` 只使用数组写法？ | [题目](../content/aaron/yingke/followups/props-validation.md) |
| 映刻影视-面试官追问题库-口语重构版.md:277 | 21. 【高频】详情数据没回来时，`movieDetail.pic.large` 会发生什么？ | [题目](../content/aaron/yingke/followups/detail-null.md) |
| 映刻影视-面试官追问题库-口语重构版.md:290 | 22. 【高频】标题和简介为什么用了不同的省略方式？简介一定要用 JavaScript 截断吗？ | [题目](../content/aaron/yingke/followups/text-truncation.md) |
| 映刻影视-面试官追问题库-口语重构版.md:306 | 23. 如果父组件传入的简介后来变化，子组件会更新吗？ | [题目](../content/aaron/yingke/followups/props-update.md) |
| 映刻影视-面试官追问题库-口语重构版.md:319 | 24. 为什么简介区域要阻止事件冒泡？ | [题目](../content/aaron/yingke/followups/event-stop.md) |
| 映刻影视-面试官追问题库-口语重构版.md:331 | 25. 点击“更多”为什么先等待 500 毫秒再跳转？ | [题目](../content/aaron/yingke/followups/navigation-delay.md) |
| 映刻影视-面试官追问题库-口语重构版.md:345 | 26. 为什么通过 URL 参数传分类 ID 和影片 ID？ | [题目](../content/aaron/yingke/followups/route-ids.md) |
| 映刻影视-面试官追问题库-口语重构版.md:359 | 27. 首页 API 和列表 API 为什么分成 `user.js`、`list.js`，但代码又很相似？ | [题目](../content/aaron/yingke/followups/api-organization.md) |
| 映刻影视-面试官追问题库-口语重构版.md:374 | 28. 为什么没有使用 Vuex？ | [题目](../content/aaron/yingke/followups/vuex-need.md) |
| 映刻影视-面试官追问题库-口语重构版.md:388 | 29. “想看”按钮为什么没有真正交互？ | [题目](../content/aaron/yingke/followups/watchlist-status.md) |
| 映刻影视-面试官追问题库-口语重构版.md:400 | 30. 为什么数据不存 LocalStorage 或 sessionStorage？ | [题目](../content/aaron/yingke/followups/storage-choice.md) |
| 映刻影视-面试官追问题库-口语重构版.md:415 | 31. 【高频】这个项目真的支持多端吗？ | [题目](../content/aaron/yingke/followups/cross-platform.md) |
| 映刻影视-面试官追问题库-口语重构版.md:429 | 32. Vant 目录中的代码是你自己写的吗？ | [题目](../content/aaron/yingke/followups/vant-ownership.md) |
| 映刻影视-面试官追问题库-口语重构版.md:442 | 33. 为什么全局注册 Vant 组件，不在每个页面单独注册？ | [题目](../content/aaron/yingke/followups/global-components.md) |
| 映刻影视-面试官追问题库-口语重构版.md:456 | 34. 为什么同时使用 `rpx` 和 `px`？ | [题目](../content/aaron/yingke/followups/rpx-px.md) |
| 映刻影视-面试官追问题库-口语重构版.md:469 | 35. `main.js` 同时有 Vue 2 和 Vue 3 代码，项目到底用哪个？ | [题目](../content/aaron/yingke/followups/vue-version.md) |
| 映刻影视-面试官追问题库-口语重构版.md:484 | 36. 【高频】`urlCheck: false` 是什么？上线后能请求任意域名吗？ | [题目](../content/aaron/yingke/followups/url-check.md) |
| 映刻影视-面试官追问题库-口语重构版.md:494 | 37. 项目里的 AppID 能放在前端吗？它是密钥吗？ | [题目](../content/aaron/yingke/followups/appid-secret.md) |
| 映刻影视-面试官追问题库-口语重构版.md:507 | 38. 如果以后接入 AI Key，应该存在哪里？ | [题目](../content/aaron/yingke/followups/future-ai-key.md) |
| 映刻影视-面试官追问题库-口语重构版.md:520 | 39. 直接从客户端请求第三方影视接口有什么风险？ | [题目](../content/aaron/yingke/followups/upstream-risks.md) |
| 映刻影视-面试官追问题库-口语重构版.md:533 | 40. 评论文本会不会产生 XSS？ | [题目](../content/aaron/yingke/followups/comment-xss.md) |
| 映刻影视-面试官追问题库-口语重构版.md:546 | 41. Token、密码和第三方密钥应该怎么处理？为什么不用 AES？ | [题目](../content/aaron/yingke/followups/future-credentials.md) |
| 映刻影视-面试官追问题库-口语重构版.md:561 | 42. 【高频】这个项目有自动化测试吗？ | [题目](../content/aaron/yingke/followups/automation-status.md) |
| 映刻影视-面试官追问题库-口语重构版.md:573 | 43. 怎样验证请求封装？ | [题目](../content/aaron/yingke/followups/verify-adapter.md) |
| 映刻影视-面试官追问题库-口语重构版.md:588 | 44. 怎样验证分页没有重复或遗漏？ | [题目](../content/aaron/yingke/followups/verify-pages.md) |
| 映刻影视-面试官追问题库-口语重构版.md:601 | 45. 首页有哪些性能优化空间？ | [题目](../content/aaron/yingke/followups/home-performance.md) |
| 映刻影视-面试官追问题库-口语重构版.md:614 | 46. 为什么代码里保留了大量 `console.log`？ | [题目](../content/aaron/yingke/followups/console-logs.md) |
| 映刻影视-项目面试稿-口语重构版.md:5 | 一、项目介绍 | [题目](../content/aaron/yingke/normal/project-overview.md) |
| 映刻影视-项目面试稿-口语重构版.md:24 | 用一句话记住各模块 | [题目](../content/aaron/yingke/normal/module-overview.md) |
| 映刻影视-项目面试稿-口语重构版.md:32 | 1. 请求层封装 | [题目](../content/aaron/yingke/normal/request-wrapper.md) |
| 映刻影视-项目面试稿-口语重构版.md:50 | 2. 首页分类聚合 | [题目](../content/aaron/yingke/normal/home-categories.md) |
| 映刻影视-项目面试稿-口语重构版.md:67 | 3. 分类列表和触底分页 | [题目](../content/aaron/yingke/normal/list-pagination.md) |
| 映刻影视-项目面试稿-口语重构版.md:85 | 4. 影视详情查询 | [题目](../content/aaron/yingke/normal/movie-detail.md) |
| 映刻影视-项目面试稿-口语重构版.md:102 | 5. 首页影视卡片组件 | [题目](../content/aaron/yingke/normal/movie-card.md) |
| 映刻影视-项目面试稿-口语重构版.md:119 | 6. 简介展开和收起 | [题目](../content/aaron/yingke/normal/description-toggle.md) |
| 映刻影视-项目面试稿-口语重构版.md:137 | 1. 首页到列表再到详情的导航链路 | [题目](../content/aaron/yingke/normal/navigation-chain.md) |
| 映刻影视-项目面试稿-口语重构版.md:152 | 2. 页面等待反馈 | [题目](../content/aaron/yingke/normal/loading-feedback.md) |
| 映刻影视-项目面试稿-口语重构版.md:167 | 3. Vant Weapp 组件接入 | [题目](../content/aaron/yingke/normal/vant-integration.md) |
| 映刻影视-项目面试稿-口语重构版.md:183 | 1. 用自定义 adapter 连接 Axios 和小程序请求 | [题目](../content/aaron/yingke/normal/axios-adapter.md) |
| 映刻影视-项目面试稿-口语重构版.md:197 | 2. 用数据驱动方式复用三个首页分类 | [题目](../content/aaron/yingke/normal/category-reuse.md) |
| 映刻影视-项目面试稿-口语重构版.md:216 | 1. 并发请求成功和失败时的数据结构不同 | [题目](../content/aaron/yingke/normal/settled-result-shape.md) |
| 映刻影视-项目面试稿-口语重构版.md:231 | 2. 分页状态会受到页面重入和连续触底影响 | [题目](../content/aaron/yingke/normal/pagination-reentry.md) |
| 映刻影视-项目面试稿-口语重构版.md:249 | 1. 请求成功与业务成功没有分层判断 | [题目](../content/aaron/yingke/normal/error-layering-gap.md) |
| 映刻影视-项目面试稿-口语重构版.md:262 | 2. 首页没有完成单分类失败降级 | [题目](../content/aaron/yingke/normal/category-fallback-gap.md) |
| 映刻影视-项目面试稿-口语重构版.md:275 | 3. 分页缺少重入、并发和 loading 收口 | [题目](../content/aaron/yingke/normal/pagination-state-gap.md) |
| 映刻影视-项目面试稿-口语重构版.md:291 | 4. 详情页缺少加载期空值和异常保护 | [题目](../content/aaron/yingke/normal/detail-state-gap.md) |
| 映刻影视-项目面试稿-口语重构版.md:304 | 5. 简介组件的状态推导不完整 | [题目](../content/aaron/yingke/normal/description-state-gap.md) |
| 映刻影视-项目面试稿-口语重构版.md:318 | 6. API 定义存在重复和命名不清楚 | [题目](../content/aaron/yingke/normal/api-duplication-gap.md) |
| 映刻影视-项目面试稿-口语重构版.md:334 | 7. 跨端能力没有实际验证，第三方接口也缺少稳定性保障 | [题目](../content/aaron/yingke/normal/platform-upstream-gap.md) |
| 映刻影视-项目面试稿-口语重构版.md:350 | 8. 缺少可执行测试和明确构建脚本 | [题目](../content/aaron/yingke/normal/testing-build-gap.md) |
| 映刻影视-项目面试稿-口语重构版.md:366 | 1. 普通业务流程 | [题目](../content/aaron/yingke/normal/verify-business.md) |
| 映刻影视-项目面试稿-口语重构版.md:380 | 2. 移动端布局 | [题目](../content/aaron/yingke/normal/verify-layout.md) |
| 映刻影视-项目面试稿-口语重构版.md:394 | 3. 异步请求和分页 | [题目](../content/aaron/yingke/normal/verify-pagination.md) |
| 映刻影视-项目面试稿-口语重构版.md:408 | 4. 接口结果和错误状态 | [题目](../content/aaron/yingke/normal/verify-errors.md) |
| 映刻影视-项目面试稿-口语重构版.md:422 | 5. AI 降级 | [题目](../content/aaron/yingke/normal/ai-fallback-scope.md) |
| 映刻影视-项目面试稿-口语重构版.md:435 | 6. 本次核对结论 | [题目](../content/aaron/yingke/normal/verification-scope.md) |
| 云枢智慧城市数据平台-代码设计追问与回答-口语重构版.md:9 | 1. AI Key 为什么存在 localStorage？为什么不放 sessionStorage、内存、Cookie 或服务端？ | [题目](../content/aaron/yunshu/followups/ai-key-storage.md) |
| 云枢智慧城市数据平台-代码设计追问与回答-口语重构版.md:25 | 2. 把 Key 用 AES 加密后再存，或者放到 Vite 环境变量，就安全了吗？ | [题目](../content/aaron/yunshu/followups/client-encryption.md) |
| 云枢智慧城市数据平台-代码设计追问与回答-口语重构版.md:39 | 3. 密码用了什么加密？为什么不用 AES、MD5 或 SHA-256？ | [题目](../content/aaron/yunshu/followups/password-algorithms.md) |
| 云枢智慧城市数据平台-代码设计追问与回答-口语重构版.md:56 | 4. Token 为什么放 Redux，又为什么用 redux-persist？只用 localStorage 不行吗？ | [题目](../content/aaron/yunshu/followups/redux-persistence.md) |
| 云枢智慧城市数据平台-代码设计追问与回答-口语重构版.md:72 | 5. 解析 JWT 的 exp 就算鉴权了吗？JWT 是不是加密的？ | [题目](../content/aaron/yunshu/followups/jwt-exp.md) |
| 云枢智慧城市数据平台-代码设计追问与回答-口语重构版.md:87 | 6. 网站是 HTTPS，密码和 AI Key 就全程安全了吗？代理在这里解决了什么？ | [题目](../content/aaron/yunshu/followups/https-proxy.md) |
| 云枢智慧城市数据平台-代码设计追问与回答-口语重构版.md:105 | 7. 为什么提前 30 秒刷新？为什么用 setTimeout，不一直 setInterval 检查？ | [题目](../content/aaron/yunshu/followups/refresh-timer.md) |
| 云枢智慧城市数据平台-代码设计追问与回答-口语重构版.md:121 | 8. Token 真的过期了还能刷新吗？你有 refreshToken 吗？ | [题目](../content/aaron/yunshu/followups/refresh-expiry.md) |
| 云枢智慧城市数据平台-代码设计追问与回答-口语重构版.md:137 | 9. 多个请求同时 401 会刷新几次？刷新途中退出会不会又自动登录？ | [题目](../content/aaron/yunshu/followups/concurrent-refresh.md) |
| 云枢智慧城市数据平台-代码设计追问与回答-口语重构版.md:153 | 10. 为什么只重试一次？刷新请求为什么不用普通 Axios 实例？POST 也能重试吗？ | [题目](../content/aaron/yunshu/followups/retry-boundary.md) |
| 云枢智慧城市数据平台-代码设计追问与回答-口语重构版.md:169 | 11. 退出登录清掉了什么？另一个标签页和 AI Key 会一起清掉吗？ | [题目](../content/aaron/yunshu/followups/logout-isolation.md) |
| 云枢智慧城市数据平台-代码设计追问与回答-口语重构版.md:185 | 12. 隐藏菜单就能防越权吗？修改角色权限后，菜单会自动变化吗？ | [题目](../content/aaron/yunshu/followups/permission-boundary.md) |
| 云枢智慧城市数据平台-代码设计追问与回答-口语重构版.md:203 | 13. AI 为什么用 SSE，不用 WebSocket？为什么用 fetch，不统一走 Axios 或原生 EventSource？ | [题目](../content/aaron/yunshu/followups/sse-fetch-choice.md) |
| 云枢智慧城市数据平台-代码设计追问与回答-口语重构版.md:219 | 14. 一次 read() 就是一条 SSE 消息吗？为什么要用 TextDecoder 和缓冲区？ | [题目](../content/aaron/yunshu/followups/stream-buffer.md) |
| 云枢智慧城市数据平台-代码设计追问与回答-口语重构版.md:232 | 15. 用户连续发送两条消息，或者离开页面，流式请求怎么办？ | [题目](../content/aaron/yunshu/followups/chat-concurrency.md) |
| 云枢智慧城市数据平台-代码设计追问与回答-口语重构版.md:248 | 16. 你的 AI 怎么查数据库？用了 RAG、向量库或大模型训练吗？模型输出怎么渲染？ | [题目](../content/aaron/yunshu/followups/ai-backend-scope.md) |
| 云枢智慧城市数据平台-代码设计追问与回答-口语重构版.md:267 | 17. 首页为什么用 Promise.all，地图为什么用 allSettled？一个请求失败会怎样？ | [题目](../content/aaron/yunshu/followups/all-vs-settled.md) |
| 云枢智慧城市数据平台-代码设计追问与回答-口语重构版.md:281 | 18. 为什么 5 分钟轮询，不用 WebSocket？手动刷新和定时刷新撞上怎么办？ | [题目](../content/aaron/yunshu/followups/polling-overlap.md) |
| 云枢智慧城市数据平台-代码设计追问与回答-口语重构版.md:296 | 19. 为什么在前端聚合数据？为什么先聚合再限制 50 个分类？这是 Top 50 吗？ | [题目](../content/aaron/yunshu/followups/aggregation-limit.md) |
| 云枢智慧城市数据平台-代码设计追问与回答-口语重构版.md:312 | 20. 为什么既保存查询配置又保存 ECharts option？保存后刷新，结果一定相同吗？ | [题目](../content/aaron/yunshu/followups/chart-persistence.md) |
| 云枢智慧城市数据平台-代码设计追问与回答-口语重构版.md:330 | 21. 地图为什么只查 10 个城市？这是并发限制吗？缺失数据怎么影响统计？ | [题目](../content/aaron/yunshu/followups/city-limit.md) |
| 云枢智慧城市数据平台-代码设计追问与回答-口语重构版.md:349 | 22. 地图和 ECharts 实例为什么用 useRef，不放 useState？切换页面如何清理？ | [题目](../content/aaron/yunshu/followups/ref-cleanup.md) |
| 云枢智慧城市数据平台-代码设计追问与回答-口语重构版.md:365 | 23. 你说做了懒加载，具体什么时候加载？怎么证明性能真的变好了？ | [题目](../content/aaron/yunshu/followups/lazy-verification.md) |
| 云枢智慧城市数据平台-代码设计追问与回答-口语重构版.md:382 | 24. CSV 为什么用 Blob 下载，不在前端拼字符串？返回 200 就说明导出成功吗？ | [题目](../content/aaron/yunshu/followups/csv-blob.md) |
| 云枢智慧城市数据平台-代码设计追问与回答-口语重构版.md:398 | 25. 用了 TypeScript，为什么还要校验接口数据？as 类型不是已经转换了吗？ | [题目](../content/aaron/yunshu/followups/typescript-runtime.md) |
| 云枢智慧城市数据平台-代码设计追问与回答-口语重构版.md:415 | 26. 你的测试到底覆盖了什么？构建通过、接口 200、页面能打开，能说明功能正确吗？ | [题目](../content/aaron/yunshu/followups/test-scope.md) |
| 云枢智慧城市数据平台-代码设计追问与回答-口语重构版.md:435 | 27. HTTP 200 是否就代表业务成功？ | [题目](../content/aaron/yunshu/followups/http-business.md) |
| 云枢智慧城市数据平台-代码设计追问与回答-口语重构版.md:449 | 28. 项目已经上线，能否说明当前代码就是线上版本？ | [题目](../content/aaron/yunshu/followups/deployment-version.md) |
| 云枢智慧城市数据平台-项目面试稿-口语重构版.md:7 | 一、项目介绍 | [题目](../content/aaron/yunshu/normal/project-overview.md) |
| 云枢智慧城市数据平台-项目面试稿-口语重构版.md:27 | 用一句话记住各模块 | [题目](../content/aaron/yunshu/normal/module-overview.md) |
| 云枢智慧城市数据平台-项目面试稿-口语重构版.md:44 | 1. 前端路由鉴权 | [题目](../content/aaron/yunshu/normal/route-auth.md) |
| 云枢智慧城市数据平台-项目面试稿-口语重构版.md:62 | 2. Token 无感刷新 | [题目](../content/aaron/yunshu/normal/token-refresh.md) |
| 云枢智慧城市数据平台-项目面试稿-口语重构版.md:81 | 3. 基于角色的页面权限控制 | [题目](../content/aaron/yunshu/normal/role-permissions.md) |
| 云枢智慧城市数据平台-项目面试稿-口语重构版.md:100 | 4. 首页数据总览、刷新和 CSV 导出 | [题目](../content/aaron/yunshu/normal/home-export.md) |
| 云枢智慧城市数据平台-项目面试稿-口语重构版.md:118 | 5. 城市地图与环境监测 | [题目](../content/aaron/yunshu/normal/city-map.md) |
| 云枢智慧城市数据平台-项目面试稿-口语重构版.md:137 | 6. AI 助手的流式回答 | [题目](../content/aaron/yunshu/normal/ai-stream.md) |
| 云枢智慧城市数据平台-项目面试稿-口语重构版.md:157 | 1. 图表创建和编辑 | [题目](../content/aaron/yunshu/normal/chart-editor.md) |
| 云枢智慧城市数据平台-项目面试稿-口语重构版.md:177 | 2. 仪表盘管理和动态重查 | [题目](../content/aaron/yunshu/normal/dashboard-refresh.md) |
| 云枢智慧城市数据平台-项目面试稿-口语重构版.md:195 | 3. 3D 城市人口视图 | [题目](../content/aaron/yunshu/normal/population-3d.md) |
| 云枢智慧城市数据平台-项目面试稿-口语重构版.md:213 | 4. 用户、角色和个人中心 | [题目](../content/aaron/yunshu/normal/user-role-management.md) |
| 云枢智慧城市数据平台-项目面试稿-口语重构版.md:234 | 5. 页面懒加载、接口代理和地图资源配置 | [题目](../content/aaron/yunshu/normal/lazy-proxy-config.md) |
| 云枢智慧城市数据平台-项目面试稿-口语重构版.md:251 | 亮点 1：Token 刷新的并发收敛和迟到响应保护 | [题目](../content/aaron/yunshu/normal/refresh-single-flight.md) |
| 云枢智慧城市数据平台-项目面试稿-口语重构版.md:268 | 亮点 2：图表配置同时保存展示结果和转换语义 | [题目](../content/aaron/yunshu/normal/chart-semantics.md) |
| 云枢智慧城市数据平台-项目面试稿-口语重构版.md:286 | 亮点 3：地图数据部分失败和命令式资源生命周期管理 | [题目](../content/aaron/yunshu/normal/map-resources.md) |
| 云枢智慧城市数据平台-项目面试稿-口语重构版.md:306 | 难点 1：SSE 数据块不等于一条完整消息 | [题目](../content/aaron/yunshu/normal/sse-framing.md) |
| 云枢智慧城市数据平台-项目面试稿-口语重构版.md:322 | 难点 2：把高德地图的命令式对象放进 React 生命周期 | [题目](../content/aaron/yunshu/normal/map-react-lifecycle.md) |
| 云枢智慧城市数据平台-项目面试稿-口语重构版.md:340 | 1. 浏览器长期保存 Token 和 AI Key | [题目](../content/aaron/yunshu/normal/credential-storage-gap.md) |
| 云枢智慧城市数据平台-项目面试稿-口语重构版.md:356 | 2. 密码链路和日志还有安全边界 | [题目](../content/aaron/yunshu/normal/password-logs-gap.md) |
| 云枢智慧城市数据平台-项目面试稿-口语重构版.md:370 | 3. 菜单权限与角色管理数据没有统一来源 | [题目](../content/aaron/yunshu/normal/permission-source-gap.md) |
| 云枢智慧城市数据平台-项目面试稿-口语重构版.md:386 | 4. 部分异步请求缺少取消和最新请求保护 | [题目](../content/aaron/yunshu/normal/request-race-gap.md) |
| 云枢智慧城市数据平台-项目面试稿-口语重构版.md:403 | 5. 接口运行时校验和错误分层不统一 | [题目](../content/aaron/yunshu/normal/runtime-validation-gap.md) |
| 云枢智慧城市数据平台-项目面试稿-口语重构版.md:420 | 6. 首页失败隔离和图表大数据处理有限 | [题目](../content/aaron/yunshu/normal/data-scale-gap.md) |
| 云枢智慧城市数据平台-项目面试稿-口语重构版.md:436 | 7. 自动化测试覆盖仍集中在纯函数 | [题目](../content/aaron/yunshu/normal/test-coverage-gap.md) |
| 云枢智慧城市数据平台-项目面试稿-口语重构版.md:453 | 8. 部署代理和第三方资源仍需要环境级验证 | [题目](../content/aaron/yunshu/normal/deployment-gap.md) |
| 云枢智慧城市数据平台-项目面试稿-口语重构版.md:471 | 1. 普通业务流程 | [题目](../content/aaron/yunshu/normal/verify-business.md) |
| 云枢智慧城市数据平台-项目面试稿-口语重构版.md:487 | 2. 移动端和容器布局 | [题目](../content/aaron/yunshu/normal/verify-layout.md) |
| 云枢智慧城市数据平台-项目面试稿-口语重构版.md:501 | 3. 异步请求、401 和乱序 | [题目](../content/aaron/yunshu/normal/verify-races.md) |
| 云枢智慧城市数据平台-项目面试稿-口语重构版.md:517 | 4. AI 流式回答和降级 | [题目](../content/aaron/yunshu/normal/verify-ai-stream.md) |
| 云枢智慧城市数据平台-项目面试稿-口语重构版.md:532 | 5. 接口业务结果、文件导出和异常状态 | [题目](../content/aaron/yunshu/normal/verify-results.md) |
| 云枢智慧城市数据平台-项目面试稿-口语重构版.md:549 | 6. 当前测试状态怎么说明 | [题目](../content/aaron/yunshu/normal/test-status.md) |
