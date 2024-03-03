import { knex as setupKnex, Knex } from 'knex'
import { env } from './env'

export const config: Knex.Config = {
  client: env.data.DATABASE_CLIENT,
  connection:
    env.data.DATABASE_CLIENT === 'sqlite'
      ? { filename: env.data.DATABASE_URL }
      : env.data.DATABASE_URL,
  useNullAsDefault: true,
  migrations: {
    extension: 'ts',
    directory: './db/migrations',
  },
}

export const knex = setupKnex(config)
