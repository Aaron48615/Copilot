# 五种设计模式示例整理

已有 `javascript/design-patterns.md` 是五种模式的概念概览，保持原样。本次新增五道代码实现题，按同一问题的实现过程与边界组织，不复制为项目经历。全部归入 JavaScript 基础题库。

原始 JS 文件不修改。代码原样保留在核心回答内；已核实的错误在代码前明确解释，不将错误注释作为正确输出。

| 来源 | 新题文件 |
| --- | --- |
| 代理模式.js | [代理模式是什么，怎样用 Proxy 拦截对象访问？](../content/aaron/basics/javascript/proxy-pattern.md) |
| 单例模式.js | [单例模式怎么实现，这段代码为什么得到同一个对象？](../content/aaron/basics/javascript/singleton-pattern.md) |
| 工厂模式.js | [工厂模式是什么，为什么把对象创建放进工厂？](../content/aaron/basics/javascript/factory-pattern.md) |
| 观察者模式.js | [观察者模式怎样注册、移除和通知观察者？](../content/aaron/basics/javascript/observer-pattern.md) |
| 装饰器模式.js | [装饰器模式怎样在保留原有功能的同时增加能力？](../content/aaron/basics/javascript/decorator-pattern.md) |

## 运行与边界核对

- 代理：读取属性触发 get；原代码先后打印两行，不是单次日志。没有实现注释提到的缓存、懒加载或安全鉴权。
- 单例：输出 true、Winner、undefined 2、Winner、undefined 3；缓存位于构造函数的静态属性，直接 new 仍可绕过入口。
- 工厂：示例只创建一种 Product，没有多种产品分支。
- 观察者：两个观察者各收到一次通知；通知由调用 notify 手动触发，原实现没有去重或异常隔离。
- 装饰器：价格输出 10000、11000 后，getDescription 调用抛出 TypeError；原对象缺少此方法。题内已说明，原代码未擅自修正。

五个文件均以本机 Node.js 实际执行核对。装饰器失败是原始示例缺陷，已明确标注，不是题库应用运行失败。

题库：基础题从 197 增至 202；JavaScript 从 23 增至 28；Aaron 总数从 396 增至 401。前次笔记导入记录保留为当时批次记录。

`npm test`：74/74 通过；`npm run build`：通过（保留已有大包告警）；`git diff --check`：通过。五份原始 JS 示例完整保留，题库的字段、核心模块、ID、分类计数与搜索由现有测试验证。未提交、未推送。
