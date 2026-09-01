import { client } from '@/sanity/lib/client'
import FeedbackClient, { FeedbackItem } from './FeedbackClient'

interface FeedbackSectionData {
  tag?: string
  titulo: string
  feedbacksList?: FeedbackItem[]
}

async function getFeedbackData(): Promise<FeedbackSectionData | null> {
  const query = `*[_type == "feedbackSection"][0]{
    tag,
    titulo,
    feedbacksList[]{
      text,
      name,
      role
    }
  }`

  try {
    return await client.fetch(query, {}, { cache: 'no-store' })
  } catch (error) {
    console.error('Erro ao carregar depoimentos do Sanity:', error)
    return null
  }
}

export default async function Feedback() {
  const data = await getFeedbackData()

  // Se não encontrar dados ou a lista estiver vazia, oculta a seção
  if (!data || !data.feedbacksList || data.feedbacksList.length === 0) {
    return null
  }

  return (
    <FeedbackClient
      tag={data.tag}
      titulo={data.titulo}
      feedbacks={data.feedbacksList}
    />
  )
}