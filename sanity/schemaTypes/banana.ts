import { defineType, defineField } from "sanity";
import { Film } from "lucide-react";

export const bananaSchema = defineType({
  name: "bananaWeddingSection",
  title: "Banana Wed Films",
  type: "document",
  icon: Film,
  fields: [
    defineField({
      name: "tag",
      title: "Tag Superior",
      type: "string",
      initialValue: "PORTFÓLIO DE VÍDEO",
    }),
    defineField({
      name: "titulo",
      title: "Título da Seção",
      type: "string",
      validation: (rule) => rule.required(),
      initialValue: "Nossos Projetos em Destaque",
    }),
    defineField({
      name: "descricao",
      title: "Descrição Curta",
      type: "text",
      rows: 2,
      initialValue:
        "Produção audiovisual de alta performance para marcas e projetos selecionados.",
    }),
    defineField({
      name: "videosList",
      title: "Lista de Vídeos",
      type: "array",
      of: [
        {
          type: "object",
          name: "videoItem",
          title: "Vídeo",
          fields: [
            defineField({
              name: "tituloProjeto",
              title: "Título do Projeto / Vídeo",
              type: "string",
              description: "Ex: Comercial Institucional 2026",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "cliente",
              title: "Cliente / Marca (Opcional)",
              type: "string",
              description: "Ex: Nome da Empresa",
            }),
            defineField({
              name: "categoria",
              title: "Categoria (Opcional)",
              type: "string",
              description: "Ex: Institucional, Comercial, Performance",
            }),
            defineField({
              name: "videoFile",
              title: "Arquivo de Vídeo (MP4/MOV)",
              type: "file",
              options: {
                accept: "video/mp4,video/x-m4v,video/*",
              },
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "thumb",
              title: "Capa do Vídeo (Thumbnail Opcional)",
              type: "image",
              description:
                "Capa estática do vídeo (se não enviada, usará o próprio vídeo)",
              options: {
                hotspot: true,
              },
            }),
          ],
          preview: {
            select: {
              title: "tituloProjeto",
              subtitle: "cliente",
              media: "thumb",
            },
            prepare({ title, subtitle, media }) {
              return {
                title: title || "Sem título",
                subtitle: subtitle ? `Cliente: ${subtitle}` : "Projeto de vídeo",
                media,
              };
            },
          },
        },
      ],
    }),
  ],
});