// Cards.tsx
import { client } from "@/sanity/lib/client";
import CardsClient, { CardItem } from "./CardsClient";

interface PortfolioData {
  tag?: string;
  titulo: string;
  descricao?: string;
  cards: CardItem[];
}

async function getPortfolioData(): Promise<PortfolioData | null> {
  const freshClient = client.withConfig({ useCdn: false });

  // 1. Busca TODOS os documentos do tipo "cardItem" publicados
  const query = `*[_type == "cardItem" && !(_id in path("drafts.**"))]{
    name,
    "slug": slug.current,
    detalhes,
    image{
      asset->{
        _id,
        url
      }
    }
  }`;

  try {
    const cards = await freshClient.fetch(
      query,
      {},
      {
        cache: "no-store",
        next: { revalidate: 0 },
      }
    );

    return {
      tag: "CREATIVE WORK",
      titulo: "Portfólio",
      descricao: "Clientes e empresas que já confiam no meu trabalho estratégico",
      cards: cards || [],
    };
  } catch (error) {
    console.error("Erro ao buscar dados do Sanity:", error);
    return null;
  }
}

export default async function Cards() {
  const data = await getPortfolioData();

  if (!data || !data.cards || data.cards.length === 0) {
    return null;
  }

  return (
    <CardsClient
      tag={data.tag}
      titulo={data.titulo}
      descricao={data.descricao}
      cards={data.cards}
    />
  );
}