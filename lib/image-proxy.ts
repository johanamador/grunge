const hosts = new Set([
  'cdn.findify.io', 'api-v3.findify.io',
  'bandmerch.com', 'www.bandmerch.com',
  'rockabilia.com', 'www.rockabilia.com',
])
const MAX_BYTES = 5 * 1024 * 1024
const imageTypes = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/gif'])

export function allowedImageUrl(value: string): URL | null {
  try {
    const url = new URL(value)
    if (url.protocol !== 'https:' || url.port || url.username || url.password) return null
    const shopify = url.hostname === 'cdn.shopify.com' && url.pathname.startsWith('/s/files/1/0090/2447/1140/')
    return hosts.has(url.hostname) || shopify ? url : null
  } catch { return null }
}

export async function fetchProductImage(value: string, fetcher: typeof fetch = fetch) {
  let url = allowedImageUrl(value)
  if (!url) throw new Error('IMAGE_URL_NOT_ALLOWED')
  const signal = AbortSignal.timeout(8000)
  for (let redirects = 0; redirects <= 3; redirects++) {
    const response: Response = await fetcher(url, {
      redirect: 'manual', signal,
      headers: { Accept: 'image/avif,image/webp,image/*', 'User-Agent': 'Mozilla/5.0' },
    })
    if ([301, 302, 303, 307, 308].includes(response.status)) {
      await response.body?.cancel()
      const location: string | null = response.headers.get('location')
      url = location ? allowedImageUrl(new URL(location, url).href) : null
      if (!url) throw new Error('IMAGE_REDIRECT_NOT_ALLOWED')
      continue
    }
    const type = response.headers.get('content-type')?.split(';')[0].trim().toLowerCase()
    if (!response.ok || !type || !imageTypes.has(type) || Number(response.headers.get('content-length')) > MAX_BYTES) {
      await response.body?.cancel()
      throw new Error('INVALID_IMAGE_RESPONSE')
    }
    const reader = response.body?.getReader()
    if (!reader) throw new Error('EMPTY_IMAGE')
    const chunks: Uint8Array[] = []
    let size = 0
    try {
      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        size += value.byteLength
        if (size > MAX_BYTES) throw new Error('IMAGE_TOO_LARGE')
        chunks.push(value)
      }
    } finally { await reader.cancel() }
    const bytes = new Uint8Array(size)
    let offset = 0
    for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.byteLength }
    return { bytes, type }
  }
  throw new Error('TOO_MANY_REDIRECTS')
}
