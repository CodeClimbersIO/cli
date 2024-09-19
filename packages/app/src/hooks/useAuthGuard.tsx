import {
  useGetLocalApiKey,
  useHasValidLocalAuthCookie,
} from '../api/localAuth.api'

export const useAuthGuard = () => {
  const { data, isPending: isValidPending } = useHasValidLocalAuthCookie()
  const isValid = data?.isValid
  const shouldFetchApiKey = !isValid && !isValidPending

  const { isError: isApiKeyError, isPending: isApiKeyPending } =
    useGetLocalApiKey(shouldFetchApiKey)

  if (shouldFetchApiKey) {
    return [!isApiKeyError, isApiKeyPending]
  } else {
    return [isValid, isValidPending]
  }
}
