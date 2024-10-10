import { v4 as uuidv4 } from 'uuid'

type SqlStorage = {
  id: string
  name: string
  sql: string
}

const saveSql = (name: string, sql: string, id: string) => {
  const storage = localStorage.getItem('sql-storage')
  const storageList = storage ? JSON.parse(storage) : []
  const existingSql = storageList.find((item: SqlStorage) => item.id === id)
  if (existingSql) {
    existingSql.name = name
    existingSql.sql = sql
  } else {
    storageList.push({ id, name, sql })
  }
  localStorage.setItem('sql-storage', JSON.stringify(storageList))
}

const getSql = (id: string): SqlStorage => {
  const storage = localStorage.getItem('sql-storage')
  const storageList = storage ? JSON.parse(storage) : []
  return storageList.find((item: SqlStorage) => item.id === id)
}

const deleteSql = (id: string) => {
  const storage = localStorage.getItem('sql-storage')
  const storageList = storage ? JSON.parse(storage) : []
  const newStorageList = storageList.filter(
    (item: SqlStorage) => item.id !== id,
  )
  localStorage.setItem('sql-storage', JSON.stringify(newStorageList))
}

const getSqlList = (): Array<SqlStorage> => {
  const storage = localStorage.getItem('sql-storage')
  const storageList = storage ? JSON.parse(storage) : []
  return storageList
}

const onAdd = () => {
  // check if sql-storage exists, if it does not, create it and add two default sql queries
  const storage = getSqlList()
  if (storage.length === 0) {
    localStorage.setItem(
      'sql-storage',
      JSON.stringify([
        {
          id: uuidv4(),
          name: 'Get last 10 activities',
          sql: 'SELECT * FROM activities_pulse ORDER BY id DESC LIMIT 10;',
        },
        {
          id: uuidv4(),
          name: 'Days spent per language',
          sql: `WITH get_language_days as (
  SELECT language, date(created_at) FROM activities_pulse
  WHERE category = 'coding' and type = 'file'
  GROUP BY date(created_at), language
  ORDER BY id DESC 
)
SELECT language, count(language) as days FROM get_language_days
WHERE language IS NOT '' AND language IS NOT NULL
GROUP BY language
ORDER BY count(language) DESC;
          `,
        },
      ]),
    )
  }
}

export { saveSql, getSql, deleteSql, getSqlList, onAdd }
