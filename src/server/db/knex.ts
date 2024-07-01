/* eslint-disable @typescript-eslint/no-explicit-any */
import Knex from 'knex'
import {
  camelCase,
  forOwn,
  isPlainObject,
  snakeCase,
} from '../utils/helpers.util'

const deepMapKeys = function (obj: any, fn: any) {
  const x: { [key: string]: any } = {}

  forOwn(obj, function (v, k) {
    if (Array.isArray(v)) {
      v = v.map(function (x) {
        return isPlainObject(x) ? deepMapKeys(x, fn) : x
      })
    }
    if (isPlainObject(v)) {
      v = deepMapKeys(v, fn)
    }
    x[fn(v, k)] = v
  })

  return x
}

const postProcessResponse = (result: any) => {
  if (!result) {
    return result
  }
  return camelCaseKeys(result)
}

const wrapIdentifier = (value: any, origImpl: any) => {
  if (snakeCase(value)) {
    return origImpl(snakeCase(value))
  } else {
    return origImpl(value)
  }
}

const camelCaseKeys = (obj: any) => {
  if (Array.isArray(obj)) {
    return obj.map((row) => {
      return deepMapKeys(row, (v: any, k: any) => camelCase(k))
    })
  } else {
    return deepMapKeys(obj, (v: any, k: any) => camelCase(k))
  }
}

const knexConfig = {
  client: 'sqlite3',
  connection: {
    filename: './codeclimber.sqlite',
  },
  useNullAsDefault: true,
  postProcessResponse, // Stuff coming back from the DB
  wrapIdentifier, // Anything going into the DB
}

export const db = Knex(knexConfig)
