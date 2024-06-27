const BASE_URL = 'http://localhost:8080'

export class ApiError extends Error {
  statusCode: number
  constructor(message: string, statusCode: number) {
    super(message)
    this.message = message
    this.statusCode = statusCode
  }
}

export function getUrlParameters(
  data: Record<string, string | number | boolean | undefined>
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
}: {
  url: string
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  body?: object
}) {
  return fetch(`${BASE_URL}${url}`, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
    },
    ...(body && { body: JSON.stringify(body || {}) }),
  })
    .then(async response => {
      if (!response.ok) {
        const responseObject = await response.json()
        throw new ApiError(responseObject?.message, response.status)
      }
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
    }).catch((err) => {
      console.error(err)
      throw err
    })
}
