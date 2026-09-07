import { readFile, access } from 'node:fs/promises'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { execFileSync } from 'node:child_process'
const root = fileURLToPath(new URL('../', import.meta.url))
const definitions = JSON.parse(await readFile(resolve(root, process.env.PROJECTS_CONFIG || 'config/projects.json'), 'utf8'))
for (const project of definitions) {
  const target = resolve(root, project.root)
  if (!/^https:\/\/github\.com\/[\w.-]+\/[\w.-]+\.git$/.test(project.repository || '')) throw new Error(`${project.id}: 需要明确的 GitHub HTTPS 仓库地址`)
  const exists = await access(target).then(() => true, () => false)
  if (exists) {
    const remote = execFileSync('git', ['remote', 'get-url', 'origin'], { cwd: target, encoding: 'utf8' }).trim()
    if (remote !== project.repository) throw new Error(`${project.id}: 已有目录来源不匹配，未修改`)
    console.log(`${project.id}: 已有仓库，保留当前版本`)
  } else {
    execFileSync('git', ['clone', '--depth', '1', '--', project.repository, target], { stdio: 'inherit' })
  }
}
