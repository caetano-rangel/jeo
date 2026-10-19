import { client } from "@/sanity/lib/client";
import HeroClient from "./HeroClient";

interface HeroData {
  tag?: string;
  titulo: string;
  descricao?: string;
  backgroundImage?: any;
  buttonText?: string;
  whatsappUrl?: string;
}

async function getHeroData(): Promise<HeroData | null> {
  const freshClient = client.withConfig({ useCdn: false });
  const query = `*[_type == "heroSection" && !(_id in path("drafts.**"))][0]`;

  try {
    const data = await freshClient.fetch(
      query,
      {},
      {
        cache: "no-store",
        next: { revalidate: 0 },
      }
    );

    // Se ainda não cadastrou nada no Sanity, retorna valores padrão
    return data || {
      tag: "Imagem & Narrativa",
      titulo: "Comunicação que traduz\nideias em presença",
      descricao: "Estratégia, conteúdo, audiovisual para marcas e projetos!",
      buttonText: "ENTRE EM CONTATO",
    };
  } catch (error) {
    console.error("Erro ao buscar dados do Hero no Sanity:", error);
    return null;
  }
}

export default async function Hero() {
  const data = await getHeroData();

  if (!data) return null;

  return (
    <HeroClient
      tag={data.tag}
      titulo={data.titulo}
      descricao={data.descricao}
      backgroundImage={data.backgroundImage}
      buttonText={data.buttonText}
      whatsappUrl={data.whatsappUrl}
    />
  );
}