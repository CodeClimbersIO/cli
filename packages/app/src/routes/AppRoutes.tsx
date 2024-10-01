import { Route, Routes } from 'react-router-dom'

import { HomePage } from '../components/Home/HomePage'
import { useAnalyticsPageSubscription } from '../hooks/useAnalytics'
import InstallPage from '../components/InstallPage'
import ImportLayout from '../layouts/ImportLayout'
import { ImportPage } from '../components/ImportPage'
import DashboardLayout from '../layouts/DashboardLayout'

const AppRoutesPageSubscription = () => {
  useAnalyticsPageSubscription()

  return <></>
}

export const AppRoutes = () => {
  return (
    <>
      <AppRoutesPageSubscription />
      <Routes>
        <Route element={<DashboardLayout />}>
          <Route path="/" element={<HomePage />} />
        </Route>
        <Route element={<ImportLayout />}>
          <Route path="/import" element={<ImportPage />} />
        </Route>
        <Route path="/install" element={<InstallPage />} />
      </Routes>
    </>
  )
}
