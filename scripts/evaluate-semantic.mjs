import { loadBanks } from '../server/api.mjs'
import { SemanticIndex } from '../server/semantic-index.mjs'
import { resolveHybrid } from '../server/hybrid-resolve.mjs'
import { describeMatch, retrieve } from '../server/resolve.mjs'
import { readFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
const root = fileURLToPath(new URL('../', import.meta.url))
const banks = await loadBanks(root)
const index = new SemanticIndex(banks, root)
const projects = JSON.parse(await readFile(new URL('../config/projects.json', import.meta.url), 'utf8')).filter(p => p.userId === banks[0].id)
const cases = [
 ['函数都执行完了，为啥里面那个变量还在？', /函数执行结束后，局部变量/],
 ['如果同一个函数每次都返回一个计数器，它们里面的数字会不会互相影响？', /闭包|计数/],
 ['闭包是什么，怎么排查它造成的内存泄漏？', /闭包|泄漏/],
 ['页面上连续输入关键词，先发出的请求反而后回来，怎么避免把最新结果覆盖？', /搜索|请求|竞态/],
 ['Vue 里面数据改变以后页面怎么知道需要重新渲染，它是怎么追踪变化的？', /响应式|响应|依赖/],
 ['React 调完更新状态的方法后，马上打印为什么还是之前的值？', /React|状态|旧值|闭包/],
 ['浏览器第二次请求同一个资源，什么情况下不用再下载完整内容？', /缓存|304/],
 ['我想让一个元素在容器里面上下左右都居中，有哪些实现方式？', /居中|布局/],
 ['城市视图里菜单隐藏了为什么还需要给路由做权限控制？', /权限|路由/],
 ['轻购购物车连续点加号，多个接口乱序返回怎么处理？', /购物车|请求|竞态/],
 ['图表外面的盒子宽度变了，ECharts 怎样才能跟着一起改变大小？', /ECharts|尺寸|图表/],
 ['两个项目的请求错误处理有什么区别？', 'generate'],
]
try {
 const deadline=Date.now()+300000
 while(index.status().status==='loading' && Date.now()<deadline) await new Promise(r=>setTimeout(r,500))
 if(index.status().status!=='ready') throw new Error(JSON.stringify(index.status()))
 retrieve(banks[0], 'warmup')
 const results=[]
 for(const [question, expected] of cases){
  const start=performance.now()
  const result=await resolveHybrid({user:banks[0],question,semanticIndex:index,projects})
  const ms=Math.round(performance.now()-start)
  const titles=(result.match?[result.match]:result.candidates||result.related||[]).map(x=>x.title)
  const raw=await index.search(banks[0].id,question)
  results.push({question,method:result.method,ms,hit:expected === 'generate' ? result.method === 'generate' && result.projectIds?.length === 2 : result.method !== 'generate' && titles.slice(0,3).some(t=>expected.test(t)),titles:titles.slice(0,3),cosines:raw.slice(0,2).map(x=>({title:describeMatch(x).title,score:Number(x.score.toFixed(3))}))})
 }
 console.log(JSON.stringify({passed:results.filter(x=>x.hit).length,total:results.length,results},null,2))
 // This exploratory report exposes misses; deterministic regressions live in tests/hybrid.test.mjs.
} finally {await index.close()}
