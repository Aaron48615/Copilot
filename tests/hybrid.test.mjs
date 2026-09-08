import test from 'node:test'
import assert from 'node:assert/strict'
import { buildRepositoryBanks } from '../src/question-bank.ts'
import { resolveHybrid } from '../server/hybrid-resolve.mjs'
import { providerConfig } from '../server/provider.mjs'
const [user] = buildRepositoryBanks([{id:'one', name:'甲'}], [
 {name:'one/a.md',raw:'---\nid: closure\ntitle: 什么是闭包\n---\n## 核心回答\n函数保存外层变量引用'},
 {name:'one/b.md',raw:'---\nid: gc\ntitle: 垃圾回收如何释放内存\n---\n## 核心回答\n不可达的对象可以被回收'},
])
const semantic = (scores, state='ready') => ({status:()=>({status:state}),search:async()=>scores.map((score,i)=>({question:user.questions[i],score}))})
test('exact stored answers remain available without embeddings or a cloud key', async()=>{
 const r=await resolveHybrid({user,question:'什么是闭包',semanticIndex:semantic([], 'loading')})
 assert.equal(r.match.questionId,'closure')
})
test('a clear semantic match returns stored answer; similar candidates require a choice',async()=>{
 const args={user,question:'外层函数结束后闭包为什么还保留变量',semanticIndex:semantic([.92,.81])}
 assert.equal((await resolveHybrid(args)).match.questionId,'closure')
 const ambiguous=await resolveHybrid({...args,semanticIndex:semantic([.87,.865])})
 assert.ok(ambiguous.candidates.length>0);assert.equal(ambiguous.match,undefined)
})
test('loading index never silently triggers paid fallback; unrelated question can generate',async()=>{
 const args={user,question:'火星大气压和太阳风有何关系',semanticIndex:semantic([], 'loading')}
 assert.ok(Array.isArray((await resolveHybrid(args)).candidates))
 const result=await resolveHybrid({...args,semanticIndex:semantic([.50,.49])})
 assert.equal(result.method,'generate')
})
test('DeepSeek Flash uses official endpoint, server-only key and non-thinking generation',()=>{
 const config=providerConfig({DEEPSEEK_API_KEY:'example'})
 assert.equal(config.apiBaseUrl,'https://api.deepseek.com')
 assert.equal(config.answerModel,'deepseek-v4-flash')
 assert.deepEqual(config.modelOptions,{thinking:{type:'disabled'}})
 assert.equal(providerConfig({OPENROUTER_API_KEY:'legacy'}).providerName,'OpenRouter')
 assert.throws(()=>providerConfig({AI_PROVIDER:'unknown'}))
})
test('explicit frameworks exclude contradictory candidates even with a high semantic score', async () => {
 const scopedUser={...user,questions:[{...user.questions[0],category:'react',title:'React 状态更新'}, {...user.questions[1],category:'vue',title:'Vue 响应式原理'}]}
 const index={status:()=>({status:'ready'}),search:async()=>scopedUser.questions.map((question,i)=>({question,score:i ? .70 : .95}))}
 const result=await resolveHybrid({user:scopedUser,question:'Vue 数据更新如何通知页面',semanticIndex:index})
 for(const item of result.candidates || result.related || [result.match]) assert.equal(item.questionId,scopedUser.questions[1].id)
})
test('cross-project comparison retrieves both configured projects instead of unrelated generic answers', async()=>{
 const result=await resolveHybrid({user,question:'两个项目的请求错误处理有什么区别？',semanticIndex:semantic([.90,.87]),projects:[{id:'a',name:'甲项目'},{id:'b',name:'乙项目'}]})
 assert.equal(result.method,'generate');assert.deepEqual(result.projectIds,['a','b'])
})
