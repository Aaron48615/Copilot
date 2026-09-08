export function providerConfig(env = process.env) {
  const provider = env.AI_PROVIDER || (env.DEEPSEEK_API_KEY ? 'deepseek' : env.OPENROUTER_API_KEY ? 'openrouter' : 'deepseek')
  if (provider === 'deepseek') return {
    apiKey: env.DEEPSEEK_API_KEY || '', answerModel: env.DEEPSEEK_MODEL || 'deepseek-v4-flash',
    apiBaseUrl: 'https://api.deepseek.com', providerName: 'DeepSeek', keyVariable: 'DEEPSEEK_API_KEY',
    modelOptions: { thinking: { type: 'disabled' } },
  }
  if (provider === 'openrouter') return { apiKey: env.OPENROUTER_API_KEY || '', answerModel: env.OPENROUTER_ANSWER_MODEL || 'qwen/qwen3-30b-a3b-instruct-2507', apiBaseUrl: 'https://openrouter.ai/api/v1', providerName: 'OpenRouter', keyVariable: 'OPENROUTER_API_KEY' }
  throw new Error('AI_PROVIDER 仅支持 deepseek 或 openrouter')
}
