import Image from 'next/image'
import { PortableText } from '@portabletext/react'
import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'

interface Estatistica {
  numero: string
  legenda: string
}

interface SobreData {
  tag?: string
  titulo: string
  bio?: any
  estatisticas?: Estatistica[]
  foto?: any
}

async function getSobreData(): Promise<SobreData | null> {
  const query = `*[_type == "sobre"][0]{
    tag,
    titulo,
    bio,
    estatisticas,
    foto
  }`

  try {
    return await client.fetch(query, {}, { next: { revalidate: 10 } })
  } catch (error) {
    console.error('Erro ao carregar dados do Sanity:', error)
    return null
  }
}

export default async function Sobre() {
  const sobreData = await getSobreData()

  if (!sobreData) {
    return null
  }

  return (
    <section className="bg-cream px-6 py-24">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 md:grid-cols-2 md:items-center">
        
        <div>
          {/* Tag Superior */}
          {sobreData.tag && (
            <span className="mb-4 block text-xs tracking-[0.3em] uppercase text-gold-dark">
              {sobreData.tag}
            </span>
          )}

          {/* Título Principal */}
          {sobreData.titulo && (
            <h2 className="mb-8 font-serif text-4xl text-gray-900 tracking-tight">
              {sobreData.titulo}
            </h2>
          )}

          {/* Biografia / Descrição */}
          {sobreData.bio && (
            <div className="space-y-6 text-sm text-gray-600 md:text-base">
              <PortableText value={sobreData.bio} />
            </div>
          )}

          {/* Divisor */}
          <div className="my-10 h-px w-full bg-gray-300/60" />

          {/* Grade de Estatísticas */}
          {sobreData.estatisticas && sobreData.estatisticas.length > 0 && (
            <div className="grid grid-cols-3 gap-6 text-center">
              {sobreData.estatisticas.map((item, index) => (
                <div key={index}>
                  <p className="font-serif text-3xl text-gold-dark">{item.numero}</p>
                  <span className="text-xs tracking-widest text-gray-500 uppercase">
                    {item.legenda}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Imagem com o efeito Blob original */}
        {sobreData.foto && (
          <div className="relative flex w-full items-center justify-center">
            <div
              className="
                h-[280px] w-[280px]
                md:h-[420px] md:w-[420px]
                overflow-hidden
                bg-black
                ring-1 ring-gold/30
                shadow-xl shadow-black/10
                animate-[blob_5s_ease-in-out_infinite]
                relative
              "
            >
              <Image
                src={urlFor(sobreData.foto).url()}
                alt={sobreData.titulo || 'Foto de perfil'}
                fill
                className="h-full w-full object-cover"
                priority
              />
            </div>
          </div>
        )}

      </div>
    </section>
  )
}