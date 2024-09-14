import { Route, Routes } from 'react-router-dom'

import PublicLayout from '../layouts/PublicLayout'
import { HomePage } from '../components/Home/HomePage'
import { useAnalyticsPageSubscription } from '../hooks/useAnalytics'
import { UpdateBanner } from '../components/common/UpdateBanner/UpdateBanner'

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
      <UpdateBanner />
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
        </Route>
      </Routes>
    </>
  )
}
