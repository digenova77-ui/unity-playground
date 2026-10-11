import assert from 'node:assert/strict'
import test from 'node:test'
import { hostFor, HOSTS } from './hosts.ts'

test('every named system installs this page and nothing else', () => {
  assert.equal(HOSTS.length, 7)
  assert.equal(HOSTS.every(host => /this page/i.test(host.how)), true)
  assert.equal(hostFor('Mozilla/5.0 (Linux; Android 14)').os, 'Android')
  assert.equal(hostFor('Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)').kernel, 'XNU')
  assert.equal(hostFor('Mozilla/5.0 (Macintosh; Intel Mac OS X) Mobile').os, 'iPad')
  assert.equal(hostFor('Mozilla/5.0 (Windows NT 10.0)').kernel, 'NT')
  assert.equal(hostFor('Mozilla/5.0 (X11; Linux x86_64)').os, 'Linux')
  assert.equal(hostFor('Mozilla/5.0 (X11; CrOS x86_64)').os, 'ChromeOS')
})
