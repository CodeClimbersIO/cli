import { BASE_API_URL } from '../'
import { apiRequest } from '../../utils/request'

// do not use this directly in a component
const sqlQueryFn = (query: string) =>
  apiRequest({
    url: `${BASE_API_URL}/localdb/query`,
    method: 'POST',
    body: { query },
  })

export { sqlQueryFn }
