import test from 'node:test'
import assert from 'node:assert/strict'
import { mkdtemp, mkdir, writeFile, rm, symlink, readFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { execFileSync } from 'node:child_process'
import { ProjectIndex } from '../server/project-index.mjs'

test('source index confines tracked files, redacts secrets, isolates users and refreshes modifications/deletions', async (t) => {
  const root = await mkdtemp(join(tmpdir(), 'copilot-index-'))
  t.after(() => rm(root, { recursive: true, force: true }))
  execFileSync('git', ['init', '-q', root])
  await mkdir(join(root, 'src'))
  await writeFile(join(root, 'src/cart.ts'), 'const cart = 1\nconst apiKey = "test-secret-value"\nconst config = {"password": "private-password"}\n')
  await writeFile(join(root, '.env'), 'SECRET=never-send')
  await writeFile(join(root, 'src/untracked.ts'), 'untracked-private')
  await symlink('/etc/hosts', join(root, 'src/link.ts'))
  execFileSync('git', ['add', 'src/cart.ts', '.env', 'src/link.ts'], { cwd: root })
  const index = new ProjectIndex(root, [{ id: 'p', name: '轻购', root: '.', userId: 'one' }, { id: 'missing', name: '缺失项目', root: './absent', userId: 'one' }])
  await index.refresh(true)
  assert.equal(index.status('one')[0].files, 1)
  assert.ok(index.status('one')[1].error)
  assert.deepEqual(index.status('two'), [])
  assert.deepEqual(index.search('two', ['cart']), [])
  assert.deepEqual(index.search('one', ['cart'], ['foreign']), [])
  let sources = index.search('one', ['cart'])
  assert.equal(sources.length, 1)
  assert.match(sources[0].text, /REDACTED/)
  assert.ok(!JSON.stringify(sources).includes('test-secret-value'))
  assert.ok(!JSON.stringify(sources).includes('private-password'))
  assert.equal(sources[0].start, 1)
  const original = await readFile(join(root, 'src/cart.ts'), 'utf8')
  assert.match(original, /test-secret-value/)
  const revision = sources[0].revision
  await writeFile(join(root, 'src/cart.ts'), 'const cart = 12345\n')
  await index.refresh(true)
  sources = index.search('one', ['cart'])
  assert.notEqual(sources[0].revision, revision)
  assert.match(sources[0].text, /12345/)
  await rm(join(root, 'src/cart.ts'))
  await index.refresh(true)
  assert.deepEqual(index.search('one', ['cart']), [])
})
