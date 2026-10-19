import { defineType, defineField } from 'sanity'

export const storytellingSchema = defineType({
  name: 'storytellingSection',
  title: 'Seção Storytelling',
  type: 'document',
  fields: [
    defineField({
      name: 'tag',
      title: 'Tag Superior',
      type: 'string',
      initialValue: 'Visual content & storytelling',
    }),
    defineField({
      name: 'titulo',
      title: 'Título da Seção',
      type: 'string',
      validation: (rule) => rule.required(),
      initialValue: 'Storymaker',
    }),
    defineField({
      name: 'descricao',
      title: 'Descrição',
      type: 'text',
      rows: 3,
      initialValue:
        'Uma abordagem real time contemporânea do audiovisual, com direção estética, olhar apurado e narrativas alinhadas à identidade de cada ocasião.',
    }),
    defineField({
      name: 'videoFile',
      title: 'Arquivo de Vídeo (MP4)',
      type: 'file',
      options: {
        accept: 'video/mp4,video/x-m4v,video/*',
      },
    }),
  ],
  preview: {
    select: {
      title: 'titulo',
      subtitle: 'tag',
    },
  },
})