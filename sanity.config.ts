import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schema } from './sanity/schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'Meu Painel',

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,

  basePath: '/studio', // <-- ESTA LINHA É OBRIGATÓRIA PARA A ROTA /studio FUNCIONAR

  plugins: [structureTool()],

  schema: schema,
})