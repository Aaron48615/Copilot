// Shared, deterministic recall for Chinese questions and English source identifiers.
const synonyms = [
  ['登录', '登陆', '鉴权', '认证', 'auth', 'login', 'token'],
  ['权限', '角色', 'permission', 'role', 'rbac'],
  ['请求', '接口', 'request', 'fetch', 'axios', 'api'],
  ['并发', '竞态', '重复请求', '乱序', '过期响应', 'race', 'sequence', 'abort', 'requestid'],
  ['取消', '中止', 'abort', 'cancel'],
  ['缓存', 'cache', 'storage'],
  ['购物车', 'cart'], ['数量', 'quantity', 'count', 'stepper'],
  ['价格', '金额', '计价', 'price', 'amount', 'total'],
  ['订单', 'order', 'checkout'], ['商品', 'product', 'goods'],
  ['图表', 'chart', 'echarts'], ['大屏', 'dashboard'],
  ['地图', 'map', 'amap'], ['三维', '3d', 'three', 'scene'],
  ['状态', 'state', 'redux', 'store'], ['更新', 'update', 'setstate'],
  ['闭包', 'closure', '旧值', '捕获'], ['内存泄漏', 'leak', '垃圾回收'],
  ['响应式', 'reactive', 'ref', 'watch'], ['防抖', 'debounce'], ['节流', 'throttle'],
  ['适配', '响应布局', 'resize', 'rem', 'viewport'],
  ['搜索', 'search', 'suggestion'], ['地址', 'address'],
  ['流式', 'stream', 'sse'], ['重试', 'retry'], ['错误', '异常', '失败', 'error', 'catch'],
]
const stop = new Set(['什么', '怎么', '如何', '一下', '这个', '那个', '就是', '里面', '然后', '你们', '你是', '可以', '为什么', 'the', 'const', 'return', 'import', 'from'])
const segmenter = new Intl.Segmenter('zh-CN', { granularity: 'word' })
export function terms(text: string, expand = false): string[] {
  const normalized = text.replace(/([a-z])([A-Z])/g, '$1 $2').toLowerCase()
  const result = new Set<string>()
  for (const word of text.match(/[a-zA-Z][a-zA-Z0-9_]{1,}/g) || []) {
    if (!stop.has(word.toLowerCase())) result.add(word.toLowerCase())
  }
  for (const { segment, isWordLike } of segmenter.segment(normalized)) {
    if (isWordLike && segment.length >= 2 && !stop.has(segment)) result.add(segment)
  }
  // Bigrams preserve matching when natural-language phrasing crosses dictionary boundaries.
  for (const run of normalized.match(/[\u3400-\u9fff]+/gu) || []) {
    for (let i = 0; i < run.length - 1; i++) {
      const pair = run.slice(i, i + 2)
      if (!stop.has(pair)) result.add(pair)
    }
  }
  if (expand) for (const group of synonyms) if (group.some((word) => result.has(word))) group.forEach((word) => result.add(word))
  return [...result]
}

export function createLexicalIndex<T>(items: T[], text: (item: T) => string) {
  const frequencies = new Map<string, number>()
  const docs = items.map((item) => {
    const words = new Set(terms(text(item)))
    words.forEach((word) => frequencies.set(word, (frequencies.get(word) || 0) + 1))
    return { item, words }
  })
  return (query: string, limit = 30) => {
    const original = new Set(terms(query))
    const words = terms(query, true)
    return docs.map(({ item, words: document }) => {
      let score = 0
      for (const word of words) if (document.has(word)) {
        score += Math.log(1 + items.length / (frequencies.get(word) || 1)) * (original.has(word) ? 1 : 0.35)
      }
      return { item, score: score / (0.7 + 0.3 * Math.sqrt(document.size / 80)) }
    }).filter((item) => item.score > 0).sort((a, b) => b.score - a.score).slice(0, limit)
  }
}
