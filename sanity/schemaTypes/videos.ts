import { defineType, defineField } from 'sanity'

export const videosSchema = defineType({
  name: 'videosSection',
  title: 'Seção Vídeos (Social Media)',
  type: 'document',
  fields: [
    defineField({
      name: 'tag',
      title: 'Tag Superior',
      type: 'string',
      initialValue: '✦ Conteúdo que conecta ✦',
    }),
    defineField({
      name: 'titulo',
      title: 'Título da Seção',
      type: 'string',
      validation: (rule) => rule.required(),
      initialValue: 'Social Media',
    }),
    defineField({
      name: 'descricao',
      title: 'Descrição Curta',
      type: 'text',
      rows: 2,
      initialValue: 'Criação de conteúdo visual estratégico para redes sociais.',
    }),
    defineField({
      name: 'videosList',
      title: 'Lista de Vídeos',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'videoItem',
          title: 'Vídeo',
          fields: [
            defineField({
              name: 'label',
              title: 'Categoria / Rótulo',
              type: 'string',
              description: 'Ex: Lifestyle, Gastronômico, Imobiliário...',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'aspectRatio',
              title: 'Formato do Vídeo',
              type: 'string',
              options: {
                list: [
                  { title: 'Vertical (Reels / Stories - 9:16)', value: 'vertical' },
                  { title: 'Horizontal (Paisagem - 16:9)', value: 'horizontal' },
                ],
                layout: 'radio',
              },
              initialValue: 'vertical',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'videoFile',
              title: 'Arquivo de Vídeo (MP4)',
              type: 'file',
              options: {
                accept: 'video/mp4,video/x-m4v,video/*',
              },
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: {
              title: 'label',
              subtitle: 'aspectRatio',
            },
          },
        },
      ],
    }),
  ],
})