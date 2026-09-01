import { client } from '@/sanity/lib/client'
import CardsClient from './CardsClient'

interface CardItem {
  name: string
  image: any
  detalhes?: string
}

interface PortfolioData {
  tag?: string
  titulo: string
  descricao?: string
  cards?: CardItem[]
}

async function getPortfolioData(): Promise<PortfolioData | null> {
  const query = `*[_type == "portfolio"][0]{
    tag,
    titulo,
    descricao,
    cards[]{
      name,
      detalhes,
      image{
        asset->{
          _id,
          url
        }
      }
    }
  }`

  try {
    return await client.fetch(query, {}, { cache: 'no-store' })
  } catch (error) {
    console.error('Erro ao buscar dados do Sanity:', error)
    return null
  }
}

export default async function Cards() {
  const data = await getPortfolioData()

  if (!data || !data.cards || data.cards.length === 0) {
    return null
  }

  return (
    <CardsClient
      tag={data.tag}
      titulo={data.titulo}
      descricao={data.descricao}
      cards={data.cards}
    />
  )
}