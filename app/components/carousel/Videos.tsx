import { client } from '@/sanity/lib/client'
import VideosClient, { VideoItem } from './VideosClient'

interface VideosSectionData {
  tag?: string
  titulo: string
  descricao?: string
  videosList?: VideoItem[]
}

async function getVideosData(): Promise<VideosSectionData | null> {
  // Incluímos 'aspectRatio' na query GROQ
  const query = `*[_type == "videosSection"][0]{
    tag,
    titulo,
    descricao,
    videosList[]{
      label,
      aspectRatio,
      "videoUrl": videoFile.asset->url
    }
  }`

  try {
    return await client.fetch(query, {}, { cache: 'no-store' })
  } catch (error) {
    console.error('Erro ao buscar dados da seção de vídeos no Sanity:', error)
    return null
  }
}

export default async function Videos() {
  const data = await getVideosData()

  if (!data || !data.videosList || data.videosList.length === 0) {
    return null
  }

  return (
    <VideosClient
      tag={data.tag}
      titulo={data.titulo}
      descricao={data.descricao}
      videos={data.videosList}
    />
  )
}