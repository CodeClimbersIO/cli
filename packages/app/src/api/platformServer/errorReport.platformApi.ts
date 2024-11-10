import { platformApiRequest } from '../request'
import { PLATFORM_API_URL } from '..'
import { useMutation } from '@tanstack/react-query'

const useSendPlatformErrorReport = () => {
  const mutationFn = (report: Record<string, unknown>) =>
    platformApiRequest({
      url: `${PLATFORM_API_URL}/error-report/discord`,
      method: 'POST',
      body: report,
    })
  return useMutation({
    mutationFn,
  })
}

export { useSendPlatformErrorReport }
