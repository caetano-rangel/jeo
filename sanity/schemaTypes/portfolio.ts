import { defineType, defineField } from 'sanity'

export const portfolioSchema = defineType({
  name: 'portfolio',
  title: 'Seção Portfólio (Cards)',
  type: 'document',
  fields: [
    defineField({
      name: 'tag',
      title: 'Tag Superior',
      type: 'string',
      initialValue: '✦ Portfólio & Clientes ✦',
    }),
    defineField({
      name: 'titulo',
      title: 'Título da Seção',
      type: 'string',
      validation: (rule) => rule.required(),
      initialValue: 'Projetos de Destaque',
    }),
    defineField({
      name: 'descricao',
      title: 'Descrição',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'cards',
      title: 'Cards de Projetos',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'card',
          title: 'Card',
          fields: [
            defineField({
              name: 'name',
              title: 'Nome do Cliente / Projeto',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'image',
              title: 'Imagem do Card',
              type: 'image',
              options: { hotspot: true },
              validation: (rule) => rule.required(),
            }),
            // CAMPO ADICIONADO PARA O POPUP
            defineField({
              name: 'detalhes',
              title: 'O que foi trabalhado (Detalhes)',
              type: 'text',
              rows: 4,
              description: 'Descreva os serviços prestados, estratégias aplicadas, resultados, etc.',
            }),
          ],
        },
      ],
    }),
  ],
})