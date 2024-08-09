export const toSQL = (query) => {
  const { sql, bindings } = query.toSQL()
  const fullQuery = bindings.reduce(
    (acc, binding) =>
      acc.replace(
        '?',
        binding instanceof Date ? `'${binding.toISOString()}'` : `'${binding}'`,
      ),
    sql,
  )
  console.log(fullQuery)
  return fullQuery
}
