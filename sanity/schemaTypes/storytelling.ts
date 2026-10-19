import { defineType, defineField } from 'sanity'

export const storytellingSchema = defineType({
  name: 'storytellingSection',
  title: 'Seção Storytelling',
  type: 'document',
  fields: [
    defineField({
      name: 'tag',
      title: 'Tag Superior (Subtítulo Pequeno)',
      type: 'string',
      initialValue: 'Visual content & storytelling',
    }),
    defineField({
      name: 'titulo',
      title: 'Título Principal',
      type: 'string',
      validation: (rule) => rule.required(),
      initialValue: 'Storymaker',
    }),
    defineField({
      name: 'descricao',
      title: 'Descrição / Texto do Storytelling',
      type: 'text',
      rows: 4,
      initialValue:
        'Uma abordagem real time contemporânea do audiovisual, com direção estética, olhar apurado e narrativas alinhadas à identidade de cada ocasião.',
    }),
    defineField({
      name: 'videoFile',
      title: 'Vídeo da Seção',
      type: 'file',
      options: {
        accept: 'video/*',
      },
      description: 'Envie um vídeo em formato MP4 ou WebM',
    }),
  ],
  preview: {
    select: {
      title: 'titulo',
      subtitle: 'tag',
    },
  },
})