import { NextRequest, NextResponse } from 'next/server'
import { allowedImageUrl, fetchProductImage } from '@/lib/image-proxy'

export async function GET(request: NextRequest) {
  const imageUrl = request.nextUrl.searchParams.get('url')
  if (!imageUrl || !allowedImageUrl(imageUrl)) {
    return new NextResponse('URL de imagen no permitida', { status: 400 })
  }
  try {
    const { bytes, type } = await fetchProductImage(imageUrl)
    return new NextResponse(bytes, {
      headers: {
        'Content-Type': type,
        'Cache-Control': 'public, max-age=86400, s-maxage=604800',
        'X-Content-Type-Options': 'nosniff',
      },
    })
  } catch {
    return new NextResponse('Imagen no disponible', { status: 502 })
  }
}
