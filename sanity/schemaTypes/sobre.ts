import { defineType, defineField } from 'sanity'

export const sobreSchema = defineType({
  name: 'sobre',
  title: 'Seção Sobre Mim',
  type: 'document',
  fields: [
    defineField({
      name: 'tag',
      title: 'Tag Superior (Ex: MINHA HISTÓRIA)',
      type: 'string',
    }),
    defineField({
      name: 'titulo',
      title: 'Título (Ex: Jeovanna Isabel)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'bio',
      title: 'Biografia / Descrição',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'estatisticas',
      title: 'Estatísticas / Métricas',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'estatistica',
          title: 'Estatística',
          fields: [
            defineField({
              name: 'numero',
              title: 'Número / Valor (Ex: 500+)',
              type: 'string',
            }),
            defineField({
              name: 'legenda',
              title: 'Legenda (Ex: CASAMENTOS)',
              type: 'string',
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'foto',
      title: 'Foto de Perfil',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  ],
})