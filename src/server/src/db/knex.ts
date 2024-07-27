/* eslint-disable @typescript-eslint/no-explicit-any */
import { Knex as KnexTypes } from 'knex'
import {
  forOwn,
  isPlainObject,
  snakeCase,
  camelCase,
} from '../../utils/helpers.util'
import { Module } from '@nestjs/common'
import { KnexModule } from 'nestjs-knex'
import * as path from 'path'

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

const IS_TEST = process.env.NODE_ENV === 'test'
const BIN_PATH = path.join(__dirname, '..', '..', '..', '..', 'bin')

// https://github.com/knex/knex/issues/1871#issuecomment-452342526
export const SQL_LITE_TEST_FILE = 'codeclimber?mode=memory&cache=shared'

export const knexConfig: KnexTypes.Config = {
  client: 'sqlite3',
  connection: {
    filename: IS_TEST ? SQL_LITE_TEST_FILE : './codeclimber.sqlite',
  },
  migrations: {
    directory: path.join(BIN_PATH, 'migrations'),
    tableName: 'knex_migrations',
  },
  seeds: {
    directory: path.join(BIN_PATH, 'seeds'),
  },
  useNullAsDefault: true,
  postProcessResponse, // Stuff coming back from the DB
  wrapIdentifier, // Anything going into the DB
  // debug: true,
  // log: {
  //   warn(message) {
  //     console.log(message)
  //   },
  //   error(message) {
  //     console.log(message)
  //   },
  //   deprecate(message) {
  //     console.log(message)
  //   },
  //   debug(message) {
  //     console.log(message)
  //   },
  // },
}

const knexModule = KnexModule.forRoot({
  config: knexConfig,
})

@Module({
  imports: [knexModule],
  exports: [knexModule],
})
export class DbModule {}
