import { BASE_API_URL } from '.'
import { apiRequest } from '../utils/request'

const sqlQueryFn = (query: string) =>
  apiRequest({
    url: `${BASE_API_URL}/localdb/query`,
    method: 'POST',
    body: { query },
  })

export default {
  sqlQueryFn,
}
