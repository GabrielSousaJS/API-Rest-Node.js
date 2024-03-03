import { config } from 'dotenv'
import { z } from 'zod'

if (process.env.NODE_ENV === 'test') {
  config({ path: '.env.test', override: true })
} else {
  config()
}

// Schema -> formato de dado
// process.env
const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('production'),
  DATABASE_CLIENT: z.enum(['sqlite', 'pg']),
  DATABASE_URL: z.string(),
  PORT: z.coerce.number().default(3333),
})

// Realiza a validação com base no schema
const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.error('Invalid enviroment variables!', _env.error.format())

  throw new Error('Invalid enviroment variables.')
}

export const env = _env
