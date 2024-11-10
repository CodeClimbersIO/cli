import { isProd } from '../../../server/utils/environment.util'
import { getGameMakerApiKey, getLocalApiKey } from '../utils/auth.util'
import { isBrowserCli } from '../utils/environment.util'

const BASE_LOCAL_URL = isBrowserCli ? '' : 'http://localhost:14400'
const PLATFORM_LOCAL_URL = isProd()
  ? 'https://platform.codeclimbers.io'
  : 'http://localhost:8000'

export class ApiError extends Error {
  statusCode: number
  constructor(message: string, statusCode: number) {
    super(message)
    this.message = message
    this.statusCode = statusCode
  }
}

export const getUrlParameters = (
  data: Record<string, string | number | boolean | undefined>,
) => {
  const ret = []
  for (const d in data) {
    const param = data[d]
    if (param !== undefined) {
      ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(param))
    }
  }
  return ret.join('&')
}

type apiType = 'local' | 'platform'

const requestFn = (apiType: apiType) => {
  const baseURL = apiType === 'local' ? BASE_LOCAL_URL : PLATFORM_LOCAL_URL

  const setHeaders = (headers?: Record<string, string>) => {
    const apiKey = apiType === 'local' ? getLocalApiKey() : getGameMakerApiKey()
    const apiKeyHeader =
      apiType === 'local' ? 'x-api-key' : 'x-game-maker-api-key'
    if (apiKey) {
      headers = {
        ...headers,
        [apiKeyHeader]: apiKey,
      }
    }
    return headers
  }

  return async ({
    url,
    method = 'GET',
    body,
    responseType = 'json',
    headers,
    credentials = 'same-origin',
  }: {
    url: string
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
    body?: object
    responseType?: 'json' | 'text' | 'blob' | 'arraybuffer'
    headers?: Record<string, string>
    credentials?: RequestCredentials
  }) => {
    headers = setHeaders(headers)
    return fetch(`${baseURL}${url}`, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      credentials,
      ...(body && { body: JSON.stringify(body || {}) }),
    })
      .then(async (response) => {
        if (!response.ok) {
          let responseObject
          const responseClone = response.clone()
          try {
            responseObject = await responseClone.json()
          } catch (err) {
            responseObject = await response.text()
          }
          throw new ApiError(responseObject?.message, response.status)
        }
        switch (responseType) {
          case 'blob':
            return response.blob()
          case 'arraybuffer':
            return response.arrayBuffer()
          case 'text':
            return response.text()
          case 'json':
          default: {
            const res = await response.text()
            if (res) {
              try {
                const json = JSON.parse(res)
                return json.data
              } catch (err) {
                return res
              }
            }
            return ''
          }
        }
      })
      .catch((err) => {
        console.error(err)
        throw err
      })
  }
}

export const apiRequest = requestFn('local')
export const platformApiRequest = requestFn('platform')
