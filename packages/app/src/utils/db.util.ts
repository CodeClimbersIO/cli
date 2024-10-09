import {
  Kysely,
  PostgresAdapter,
  DummyDriver,
  PostgresIntrospector,
  PostgresQueryCompiler,
  CompiledQuery,
} from 'kysely'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Database = Record<string, any>

export const db = new Kysely<Database>({
  dialect: {
    createAdapter: () => new PostgresAdapter(),
    createDriver: () => new DummyDriver(),
    createIntrospector: (db) => new PostgresIntrospector(db),
    createQueryCompiler: () => new PostgresQueryCompiler(),
  },
})

// Extend the CompiledQuery interface
declare module 'kysely' {
  interface CompiledQuery {
    sqlWithBindings(): string
  }
}

// Implement the sqlWithBindings method
export const sqlWithBindings = (compiledQuery: CompiledQuery): string => {
  let sql = compiledQuery.sql
  const parameters = compiledQuery.parameters

  // Replace each parameter placeholder with its corresponding value
  parameters.forEach((param, index) => {
    const placeholder = `$${index + 1}`
    let replacement: string

    if (param === null) {
      replacement = 'NULL'
    } else if (typeof param === 'string') {
      replacement = `'${param.replace(/'/g, "''")}'` // Escape single quotes
    } else if (typeof param === 'number' || typeof param === 'boolean') {
      replacement = param.toString()
    } else if (param instanceof Date) {
      replacement = `'${param.toISOString()}'`
    } else {
      replacement = `'${JSON.stringify(param)}'`
    }

    sql = sql.replace(placeholder, replacement)
  })

  return sql
}
