import { Route, Routes } from 'react-router-dom'

import PublicLayout from '../layouts/PublicLayout'
import { HomePage } from '../components/Home/HomePage'

type Props = { changeTheme: () => void }
export const AppRoutes = ({ changeTheme }: Props) => {
  return (
    <>
      <Routes>
        <Route element={<PublicLayout changeTheme={changeTheme} />}>
          <Route path="/" element={<HomePage />} />
        </Route>
      </Routes>
    </>
  )
}
