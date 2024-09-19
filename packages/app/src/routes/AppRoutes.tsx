import { Route, Routes } from 'react-router-dom'

import PublicLayout from '../layouts/PublicLayout'
import { HomePage } from '../components/Home/HomePage'
import { useAnalyticsPageSubscription } from '../hooks/useAnalytics'
import InstallPage from '../components/InstallPage'
import ImportLayout from '../layouts/ImportLayout'
import { ImportPage } from '../components/ImportPage'
import BaseLayout from '../layouts/BaseLayout'

// We want to subscribe to events in the router, but we don't want to rerender
// the entire app when the route changes.
const AppRoutesPageSubscription = () => {
  useAnalyticsPageSubscription()

  return <></>
}

export const AppRoutes = () => {
  return (
    <>
      <AppRoutesPageSubscription />
      <Routes>
        <Route element={<BaseLayout />}>
          <Route element={<PublicLayout />}>
            <Route path="/" element={<HomePage />} />
          </Route>
          <Route element={<ImportLayout />}>
            <Route path="/import" element={<ImportPage />} />
          </Route>
          <Route>
            <Route path="/install" element={<InstallPage />} />
          </Route>
        </Route>
      </Routes>
    </>
  )
}
