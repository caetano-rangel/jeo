import { defineType } from "sanity";

export const portfolioSchema = defineType({
  name: "cardItem",
  title: "Cards (Empresas)",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Nome da Empresa",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug (URL da página)",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "image",
      title: "Imagem de Capa (Bolinha)",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "detalhes",
      title: "Detalhes do Projeto",
      type: "text",
    },
    {
      name: "galeriaFotos",
      title: "Galeria de Fotos",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    },
    {
      name: "videos",
      title: "Lista de Vídeos (Upload)",
      type: "array",
      of: [
        {
          type: "object",
          name: "videoItem",
          fields: [
            { name: "label", title: "Título do Vídeo", type: "string" },
            {
              name: "videoFile",
              title: "Arquivo de Vídeo (Upload MP4/MOV)",
              type: "file",
              options: {
                accept: "video/*",
              },
            },
          ],
        },
      ],
    },
  ],
});