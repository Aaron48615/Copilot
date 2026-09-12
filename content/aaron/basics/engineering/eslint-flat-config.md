---
id: aaron-basic-engineering-eslint-flat-config
title: ESLint 的 Flat Config 怎么配置，怎样接入工作流？
aliases: [ESLint 配置的匹配和覆盖规则是什么？, 怎样设置 lint 命令并在提交与 CI 中执行？]
category: engineering
difficulty: 进阶
priority: normal
projects: []
keywords: [ESLint, Flat Config, CI, 规则]
---

# ESLint 的 Flat Config 怎么配置，怎样接入工作流？

## 核心回答

### 当前配置方式：Flat Config

ESLint v10 已移除 `.eslintrc.*` 配置系统，当前使用 `eslint.config.js` / `eslint.config.mjs` / `eslint.config.cjs` 等 Flat Config 文件。

```bash
npm install --save-dev eslint @eslint/js
```

```js
// eslint.config.js
import { defineConfig } from "eslint/config";
import js from "@eslint/js";

export default defineConfig([
  js.configs.recommended,
  {
    files: ["src/**/*.{js,mjs,cjs}"],
    ignores: ["dist/**", "coverage/**"],
    rules: {
      eqeqeq: "error",
      "no-console": "warn",
      "prefer-const": "error",
    },
  },
  {
    files: ["**/*.test.js"],
    rules: {
      "no-console": "off",
    },
  },
]);
```

Flat Config 导出的是配置对象数组，后面匹配到的配置可继续覆盖前面的规则。`files` 和 `ignores` 都使用 glob 来限定作用范围。

#### 规则严重程度

| 配置 | 别名 | 效果 |
| --- | --- | --- |
| `"off"` | `0` | 关闭规则 |
| `"warn"` | `1` | 报警告，默认不令 CLI 失败 |
| `"error"` | `2` | 报错，CLI 通常以非 0 状态退出 |

规则还可以用数组传入选项：

```js
const config = {
  rules: {
    quotes: ["error", "double", { avoidEscape: true }],
  },
};
```

### 常用命令和工作流

```json
{
  "scripts": {
    "lint": "eslint . --cache --max-warnings 0",
    "lint:fix": "eslint . --fix"
  }
}
```

- `--fix`：自动修复可修复问题。
- `--cache`：跳过未变更的文件，加快再次检查。
- `--max-warnings 0`：有任何 warning 也让 CI 失败，适合规则管理严格的项目。
- `--print-config file.js`：查看某个文件最终合并后的配置，是排查配置未生效的重要手段。

推荐的执行时机：

1. 编辑器保存时即时提示或修复。
2. `lint-staged` 等工具在提交前只检查已暂存文件。
3. CI 对完整代码运行 `lint`，作为合并门禁。

> [!warning]
> Git hook 可以被跳过，不能代替 CI。CI 才是所有开发者和机器共用的最终校验环境。
