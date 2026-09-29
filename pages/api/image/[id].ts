import type { NextApiRequest, NextApiResponse } from 'next'

// Сервер изображений artic.edu (Cloudflare) отвечает 403 на запросы без заголовка AIC-User-Agent,
// а браузер не может добавить его к <img>, поэтому картинки загружаются через этот прокси
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query

  if (typeof id !== 'string' || !/^[\w-]+$/.test(id)) {
    res.status(400).end()
    return
  }

  try {
    const response = await fetch(`https://www.artic.edu/iiif/2/${id}/full/843,/0/default.jpg`, {
      headers: { 'AIC-User-Agent': 'art-app (educational project)' },
    })

    if (!response.ok) {
      res.status(response.status).end()
      return
    }

    const image = Buffer.from(await response.arrayBuffer())
    res.setHeader('Content-Type', response.headers.get('content-type') ?? 'image/jpeg')
    res.setHeader('Cache-Control', 'public, max-age=86400, immutable')
    res.send(image)
  } catch {
    res.status(502).end()
  }
}
