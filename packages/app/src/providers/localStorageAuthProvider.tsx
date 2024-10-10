import { useGetLocalApiKey } from '../services/localAuth.service'
import { LoadingScreen } from '../components/LoadingScreen'
import { getLocalApiKey, setLocalApiKey } from '../utils/auth.util'

interface Props {
  children: React.ReactNode
}

export const LocalStorageAuthProvider = ({ children }: Props) => {
  const localApiKey = getLocalApiKey()
  const { data, isFetching } = useGetLocalApiKey(!localApiKey)

  if (isFetching) {
    return <LoadingScreen />
  }
  if (data?.apiKey) {
    setLocalApiKey(data.apiKey)
  }
  return <>{children}</>
}
