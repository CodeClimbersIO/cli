import { Route, Routes } from 'react-router-dom'

import PublicLayout from '../layouts/PublicLayout'
import { HomePage } from '../components/Home/HomePage'
import { useAnalyticsPageSubscription } from '../hooks/useAnalytics'

export const AppRoutes = () => {
  useAnalyticsPageSubscription()

  return (
    <>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
        </Route>
      </Routes>
    </>
  )
}
