import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import VideosClient, { VideoItem } from "@/app/components/carousel/VideosClient";
import GaleriaModal from "./GaleriaModal";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function EmpresaPage({ params }: PageProps) {
  const { slug } = await params;

  if (!slug) {
    notFound();
  }

  const query = `*[_type == "cardItem" && slug.current == $slug && !(_id in path("drafts.**"))][0]{
    name,
    detalhes,
    image{
      asset->{
        _id,
        url
      }
    },
    galeriaFotos[]{
      _key,
      asset->{
        _id,
        url
      }
    },
    videos[]{
      label,
      "videoUrl": videoFile.asset->url
    }
  }`;

  const freshClient = client.withConfig({ useCdn: false });
  const empresa = await freshClient.fetch(query, { slug }, { cache: "no-store" });

  if (!empresa) {
    notFound();
  }

  const logoUrl = empresa.image?.asset?.url || (empresa.image ? urlFor(empresa.image).url() : null);

  const videosFormatados: VideoItem[] = (empresa.videos || [])
    .filter((v: any) => Boolean(v?.videoUrl))
    .map((v: any) => ({
      label: v.label || empresa.name || "Vídeo",
      videoUrl: v.videoUrl,
    }));

  const fotosFormatadas = (empresa.galeriaFotos || [])
    .map((foto: any, index: number) => {
      const url = foto?.asset?.url || (foto ? urlFor(foto).url() : null);
      return {
        url,
        key: foto._key || String(index),
      };
    })
    .filter((f: any) => Boolean(f.url));

  return (
    <main className="min-h-screen bg-cream text-gray-900 px-4 sm:px-6 py-12 md:py-20">
      {/* Botão de Voltar */}
      <div className="max-w-6xl mx-auto mb-12">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-gray-400 hover:text-gray-900 transition-colors"
        >
          ← Voltar para o Portfólio
        </Link>
      </div>

      {/* CABEÇALHO */}
      <section className="max-w-3xl mx-auto text-center mb-16 sm:mb-20">
        {logoUrl && (
          <div className="relative h-28 w-28 sm:h-32 sm:w-32 mx-auto mb-6 rounded-full overflow-hidden bg-gray-200 border border-gray-300/80 shadow-sm">
            <Image
              src={logoUrl}
              alt={empresa.name}
              fill
              className="object-cover"
            />
          </div>
        )}

        <span className="block text-[10px] tracking-[0.35em] uppercase font-medium text-gray-400 mb-3">
          PROJETO & BRANDING
        </span>

        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-gray-900 tracking-tight mb-4">
          {empresa.name}
        </h1>

        <div className="flex items-center justify-center gap-3 my-8">
          <div className="h-px w-12 bg-gray-300/80" />
          <div className="h-1 w-1 rounded-full bg-gray-400" />
          <div className="h-px w-12 bg-gray-300/80" />
        </div>

        {empresa.detalhes && (
          <p className="mx-auto max-w-xl text-sm sm:text-base leading-relaxed text-[#7a6c62] whitespace-pre-line">
            {empresa.detalhes}
          </p>
        )}
      </section>

      {/* SEÇÃO DE VÍDEOS REFORMULADA */}
      {videosFormatados.length > 0 && (
        <section className="max-w-6xl mx-auto mb-20">
          <div className="text-center mb-6">
            <span className="text-[10px] tracking-[0.3em] uppercase text-gray-400 font-medium block mb-1">
              CONTEÚDO EM VÍDEO
            </span>
            <h2 className="font-serif text-2xl text-gray-900">
              Produções Audiovisuais
            </h2>
          </div>

          {/* Container com cor uniforme e sem esbranquiçado nas pontas */}
          <div className="bg-[#f0eee9] py-4 px-0 sm:px-6 rounded-2xl border border-gray-300/60 shadow-sm overflow-hidden 
            [&_section]:py-0 
            [&_video]:rounded-xl 
            [&_.flex-shrink-0]:!w-[78vw] 
            [&_.flex-shrink-0]:sm:!w-[300px] 
            [&_.flex-shrink-0]:md:!w-[340px] 
            [&>div>div.flex]:!px-6 
            [&>div>div.flex]:!gap-4 
            [&>div>div.flex]:!overflow-x-auto 
            [&>div>div.flex]:!snap-x 
            [&>div>div.flex]:!snap-mandatory"
          >
            <VideosClient
              tag=""
              titulo=""
              descricao=""
              videos={videosFormatados}
            />

            {/* Indicação "Arraste para o lado →" posicionado abaixo dos contadores de vídeo */}
            <div className="flex items-center justify-center gap-2 text-[10px] text-gray-400 uppercase tracking-widest mt-4">
              <span>Arraste para o lado</span>
              <span className="animate-pulse">→</span>
            </div>
          </div>
        </section>
      )}

      {/* GALERIA DE FOTOS */}
      {fotosFormatadas.length > 0 && (
        <section className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-[10px] tracking-[0.3em] uppercase text-gray-400 font-medium block mb-1">
              REGISTROS VISUAIS
            </span>
            <h2 className="font-serif text-2xl text-gray-900">
              Galeria de Fotos
            </h2>
          </div>

          <GaleriaModal fotos={fotosFormatadas} nomeEmpresa={empresa.name} />
        </section>
      )}
    </main>
  );
}