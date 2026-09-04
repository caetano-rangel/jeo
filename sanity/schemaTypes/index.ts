import { sobreSchema } from './sobre'
import { portfolioSchema } from './portfolio'
import { videosSchema } from './videos'
import { feedbackSchema } from './feedback'
import { bananaSchema }from "./banana";

export const schema = {
  types: [sobreSchema, portfolioSchema, videosSchema, feedbackSchema, bananaSchema], // <-- Adicionado
}