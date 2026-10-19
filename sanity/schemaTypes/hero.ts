import { defineType, defineField } from 'sanity'

export const heroSchema = defineType({
  name: 'heroSection',
  title: 'Seção Hero (Capa)',
  type: 'document',
  fields: [
    defineField({
      name: 'tag',
      title: 'Tag Superior (Ex: Fotografia & Vídeo)',
      type: 'string',
      initialValue: 'Fotografia & Vídeo',
    }),
    defineField({
      name: 'titulo',
      title: 'Título Principal',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required(),
      initialValue: 'Comunicação que traduz ideias em presença!',
    }),
    defineField({
      name: 'descricao',
      title: 'Descrição / Texto de Apoio',
      type: 'text',
      rows: 2,
      initialValue: 'Estratégia, conteúdo, audiovisual para marcas e projetos!',
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Imagem de Fundo (Capa)',
      type: 'image',
      options: {
        hotspot: true, // Permite ajustar o ponto focal da imagem
      },
    }),
    defineField({
      name: 'buttonText',
      title: 'Texto do Botão',
      type: 'string',
      initialValue: 'ENTRE EM CONTATO',
    }),
    defineField({
      name: 'whatsappUrl',
      title: 'Link / URL do WhatsApp',
      type: 'url',
      initialValue: 'https://wa.me/5591980486792?text=Ol%C3%A1!%20Gostaria%20de%20fazer%20um%20or%C3%A7amento.',
    }),
  ],
  preview: {
    select: {
      title: 'titulo',
      subtitle: 'tag',
      media: 'backgroundImage',
    },
  },
})