import { client } from "@/sanity/lib/client";
import StorytellingClient from "./StorytellingClient";

interface StorytellingData {
  tag?: string;
  titulo: string;
  descricao?: string;
  videoUrl?: string;
}

async function getStorytellingData(): Promise<StorytellingData | null> {
  const freshClient = client.withConfig({ useCdn: false });
  // Adicionamos a extração da URL do asset do vídeo
  const query = `*[_type == "storytellingSection" && !(_id in path("drafts.**"))][0]{
    tag,
    titulo,
    descricao,
    "videoUrl": videoFile.asset->url
  }`;

  try {
    const data = await freshClient.fetch(
      query,
      {},
      {
        cache: "no-store",
        next: { revalidate: 0 },
      }
    );

    return (
      data || {
        tag: "Visual content & storytelling",
        titulo: "Storymaker",
        descricao:
          "Uma abordagem real time contemporânea do audiovisual, com direção estética, olhar apurado e narrativas alinhadas à identidade de cada ocasião.",
      }
    );
  } catch (error) {
    console.error("Erro ao buscar dados de Storytelling no Sanity:", error);
    return null;
  }
}

export default async function Storytelling() {
  const data = await getStorytellingData();

  if (!data) return null;

  return (
    <StorytellingClient
      tag={data.tag}
      titulo={data.titulo}
      descricao={data.descricao}
      videoUrl={data.videoUrl}
    />
  );
}