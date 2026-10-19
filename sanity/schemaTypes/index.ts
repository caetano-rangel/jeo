import { sobreSchema } from './sobre'
import { portfolioSchema } from './portfolio'
import { videosSchema } from './videos'
import { feedbackSchema } from './feedback'
import { bananaSchema } from './banana'
import { heroSchema } from './hero'
import { storytellingSchema } from './storytelling' // <-- Importe aqui

export const schema = {
  types: [
    sobreSchema, 
    portfolioSchema, 
    videosSchema, 
    feedbackSchema, 
    bananaSchema,
    heroSchema,
    storytellingSchema, // <-- Adicione aqui na lista
  ],
}