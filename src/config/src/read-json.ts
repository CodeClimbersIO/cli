import { existsSync, readFile } from 'node:fs'

export const readJSON = async (file: string): Promise<unknown> => {
  if (!file || !existsSync(file) || !file.endsWith('.json')) {
    throw new Error('Invalid or unresolvable file')
  }
  return new Promise((resolve) =>
    readFile(file, 'utf8', (error, content) => {
      if (error) {
        throw error
      }
      resolve(JSON.parse(content))
    }),
  )
}
