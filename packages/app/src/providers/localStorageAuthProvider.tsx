import { useGetLocalApiKey } from '../api/localAuth.api'
import { LoadingScreen } from '../components/LoadingScreen'
import authUtil from '../utils/auth.util'

interface Props {
  children: React.ReactNode
}

export const LocalStorageAuthProvider = ({ children }: Props) => {
  const localApiKey = authUtil.getLocalApiKey()
  const { data, isFetching } = useGetLocalApiKey(!localApiKey)

  if (isFetching) {
    return <LoadingScreen />
  }
  if (data?.apiKey) {
    authUtil.setLocalApiKey(data.apiKey)
  }
  return <>{children}</>
}
