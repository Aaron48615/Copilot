---
id: aaron-basic-engineering-eslint-custom-rule
title: 怎样编写一条 ESLint 自定义规则？
aliases: [ESLint 规则怎样报告 AST 中的问题？, 自定义 lint 规则的基本结构是什么？]
category: engineering
difficulty: 进阶
priority: normal
projects: []
keywords: [ESLint, AST, context.report, RuleTester]
---

# 怎样编写一条 ESLint 自定义规则？

## 核心回答

### 自定义规则的最小示例

下面的规则禁止调用 `alert()`，展示 ESLint 规则的核心结构：

```js
export default {
  meta: {
    type: "problem",
    schema: [],
    messages: {
      noAlert: "请使用项目的通知组件，不要直接调用 alert()"
    }
  },
  create(context) {
    return {
      CallExpression(node) {
        if (node.callee.type === "Identifier" && node.callee.name === "alert") {
          context.report({ node, messageId: "noAlert" });
        }
      }
    };
  }
};
```

`create()` 返回 AST 节点访问器，命中目标节点时通过 `context.report()` 报告。真实项目还应为规则写 `RuleTester` 测试，覆盖正例、反例和自动修复输出。
