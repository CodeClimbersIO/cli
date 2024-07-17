import { HashRouter } from 'react-router-dom'
import { AppRoutes } from './AppRoutes'

// import { AppRoutes } from './appRoutes'
// import { useGetHealth } from '../api'
// import Oops from '../components/Oops'

type Props = { changeTheme: () => void }
function AppRouter({ changeTheme }: Props) {
  // const { data: healthCheck, isPending, error } = useGetHealth()
  return (
    <>
      <HashRouter>
        <AppRoutes changeTheme={changeTheme} />
        {/* {(!isPending && (error || !healthCheck.OK)) ? <Oops /> : <AppRoutes /> } */}
      </HashRouter>
    </>
  )
}

export default AppRouter
