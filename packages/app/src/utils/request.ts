import { isBrowserCli } from './environment'

const BASE_URL = isBrowserCli ? '' : 'http://localhost:14400'

export class ApiError extends Error {
  statusCode: number
  constructor(message: string, statusCode: number) {
    super(message)
    this.message = message
    this.statusCode = statusCode
  }
}

export function getUrlParameters(
  data: Record<string, string | number | boolean | undefined>,
) {
  const ret = []
  for (const d in data) {
    const param = data[d]
    if (param !== undefined) {
      ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(param))
    }
  }
  return ret.join('&')
}

export async function apiRequest({
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
}) {
  return fetch(`${BASE_URL}${url}`, {
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
        const responseObject = await response.json()
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
