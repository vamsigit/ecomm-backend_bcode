import dotenv from 'dotenv-safe'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const current_dir = dirname(fileURLToPath(import.meta.url))

const env = dotenv.config({
  path: join(current_dir, '../.env'),
  sample: join(current_dir, '../.env.sample'),
})

export default env.parsed
