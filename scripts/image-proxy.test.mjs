import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import ts from 'typescript'

const source = await readFile(new URL('../lib/image-proxy.ts', import.meta.url), 'utf8')
const js = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } }).outputText
const { allowedImageUrl, fetchProductImage } = await import('data:text/javascript;base64,' + Buffer.from(js).toString('base64'))
const valid = 'https://cdn.shopify.com/s/files/1/0090/2447/1140/files/shirt.jpg'

test('only known image providers and the catalog Shopify store are accepted', () => {
  assert.ok(allowedImageUrl(valid))
  assert.ok(allowedImageUrl('https://cdn.findify.io/shirt.jpg'))
  for (const url of ['http://cdn.findify.io/x', 'https://localhost/x', 'https://127.0.0.1/x', 'https://rockabilia.com.evil.test/x', 'https://user:pass@rockabilia.com/x', 'https://rockabilia.com:444/x', 'https://cdn.shopify.com/s/files/other-store/x', 'file:///etc/passwd']) {
    assert.equal(allowedImageUrl(url), null, url)
  }
})
test('an allowed small image preserves its bytes and content type', async () => {
  const result = await fetchProductImage(valid, async () => new Response(new Uint8Array([1,2,3]), { headers: { 'Content-Type': 'image/webp' } }))
  assert.deepEqual([...result.bytes], [1,2,3])
  assert.equal(result.type, 'image/webp')
})
test('redirects cannot escape the allowlist', async () => {
  let calls = 0
  await assert.rejects(fetchProductImage(valid, async () => { calls++; return new Response(null, { status: 302, headers: { location: 'http://127.0.0.1/private' } }) }), /REDIRECT_NOT_ALLOWED/)
  assert.equal(calls, 1)
})
test('relative redirects to allowed images work', async () => {
  let calls = 0
  const result = await fetchProductImage(valid, async () => ++calls === 1 ? new Response(null, { status: 302, headers: { location: './other.jpg' } }) : new Response('image', { headers: { 'content-type': 'image/jpeg' } }))
  assert.equal(calls, 2)
  assert.equal(result.type, 'image/jpeg')
})
test('non-images and oversized content-length are rejected', async () => {
  for (const headers of [{ 'content-type': 'video/mp4' }, { 'content-type': 'text/html' }, { 'content-type': 'image/png', 'content-length': '99999999' }]) {
    await assert.rejects(fetchProductImage(valid, async () => new Response('body', { headers })), /INVALID_IMAGE_RESPONSE/)
  }
})
test('stream size limit applies even without content-length', async () => {
  await assert.rejects(fetchProductImage(valid, async () => new Response(new Uint8Array(5 * 1024 * 1024 + 1), { headers: { 'content-type': 'image/png' } })), /IMAGE_TOO_LARGE/)
})
test('redirect loops stop after four requests', async () => {
  let calls = 0
  await assert.rejects(fetchProductImage(valid, async () => { calls++; return new Response(null, { status: 302, headers: { location: valid } }) }), /TOO_MANY_REDIRECTS/)
  assert.equal(calls, 4)
})
