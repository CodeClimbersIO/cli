import { Route, Routes } from 'react-router-dom'

import { HomePage } from '../components/Home/HomePage'
import { useAnalyticsPageSubscription } from '../hooks/useAnalytics'
import InstallPage from '../components/InstallPage'
import ImportLayout from '../layouts/ImportLayout'
import { ImportPage } from '../components/ImportPage'
import DashboardLayout from '../layouts/DashboardLayout'
import { ExtensionsPage } from '../components/Extensions/ExtensionsPage'
import extensionsService from '../services/extensions.service'
import { ExtensionsLayout } from '../layouts/ExtensionsLayout'

const AppRoutesPageSubscription = () => {
  useAnalyticsPageSubscription()

  return <></>
}

export const AppRoutes = () => {
  const extensions = extensionsService.getActiveDashboardExtensionRoutes()
  return (
    <>
      <AppRoutesPageSubscription />
      <Routes>
        <Route element={<DashboardLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/extensions" element={<ExtensionsPage />} />
        </Route>
        <Route element={<ExtensionsLayout />}>
          {extensions.map((extension) => {
            return (
              <Route
                key={extension.id}
                path={extension.route}
                element={<extension.pageComponent />}
              />
            )
          })}
        </Route>
        <Route element={<ImportLayout />}>
          <Route path="/import" element={<ImportPage />} />
        </Route>
        <Route path="/install" element={<InstallPage />} />
      </Routes>
    </>
  )
}
