import { defineType, defineField } from 'sanity'

export const feedbackSchema = defineType({
  name: 'feedbackSection',
  title: 'Seção Depoimentos (Feedback)',
  type: 'document',
  fields: [
    defineField({
      name: 'tag',
      title: 'Tag Superior',
      type: 'string',
      initialValue: '✦ Conteúdo que Conecta ✦',
    }),
    defineField({
      name: 'titulo',
      title: 'Título da Seção',
      type: 'string',
      validation: (rule) => rule.required(),
      initialValue: 'O que dizem',
    }),
    defineField({
      name: 'feedbacksList',
      title: 'Lista de Depoimentos',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'feedbackItem',
          title: 'Depoimento',
          fields: [
            defineField({
              name: 'text',
              title: 'Depoimento / Texto',
              type: 'text',
              rows: 3,
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'name',
              title: 'Nome do Cliente',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'role',
              title: 'Cargo / Empresa',
              type: 'string',
              description: 'Ex: Diretora de Marketing, CEO, etc.',
            }),
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'role',
            },
          },
        },
      ],
    }),
  ],
})