import { defineType, defineField } from "sanity";
import { Film } from "lucide-react";

export const bananaSchema = defineType({
  name: "bananaWeddingSection",
  title: "Banana Wedding Films",
  type: "document",
  icon: Film,
  fields: [
    defineField({
      name: "tag",
      title: "Tag Superior",
      type: "string",
      initialValue: "Banana Wedding Films",
    }),
    defineField({
      name: "titulo",
      title: "Título da Seção",
      type: "string",
      validation: (rule) => rule.required(),
      initialValue: "Eternizando Histórias de Amor",
    }),
    defineField({
      name: "descricao",
      title: "Descrição Curta",
      type: "text",
      rows: 2,
      initialValue:
        "Produção audiovisual especializada em filmes de casamento com estilo cinematográfico.",
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
              name: "casal",
              title: "Nome do Casamento / Casal",
              type: "string",
              description: "Ex: Mariana & Lucas",
              validation: (rule) => rule.required(),
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
              description: "Capa estática do vídeo (se não enviada, usará o próprio vídeo)",
              options: {
                hotspot: true,
              },
            }),
          ],
          preview: {
            select: {
              title: "casal",
              media: "thumb",
            },
          },
        },
      ],
    }),
  ],
});