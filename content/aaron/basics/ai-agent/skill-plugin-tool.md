---
id: aaron-basic-ai-agent-skill-plugin-tool
title: Skill、Plugin 和 Tool 有什么区别
aliases: [AI 工具与技能及插件怎么区分？, Skill 和可调用工具是什么关系？]
category: ai-agent
difficulty: 基础
priority: normal
projects: []
keywords: [Skill, Plugin, Tool]
---

# Skill、Plugin 和 Tool 有什么区别

## 核心回答

| 概念 | 作用 | 类比 |
| --- | --- | --- |
| Tool | 执行一个可调用操作，如查数据、读文件、运行测试 | 一件工具 |
| Skill | 封装某类任务的指令、流程，以及可选脚本/模板/资料 | 使用工具的 SOP |
| Plugin | 更大的可安装扩展包，可以同时带来 Skill、MCP 服务、App 或 UI | 工具箱/扩展包 |

Skill 的价值是把可复用经验从一次性 Prompt 变成可版本化、可反复执行的流程。例如“生成 Word 并渲染检查每一页”不只是一个工具调用，而是一套多步骤 Skill。

> [!warning]
> Skill 或 Plugin 本质上会向 Agent 引入新指令和权限。安装前要检查来源、脚本、网络/文件权限和敏感数据范围，不要把未审查扩展当作普通 Prompt。
