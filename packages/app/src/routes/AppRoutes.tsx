import { Route, Routes } from 'react-router-dom'

import { HomePage } from '../components/Home/HomePage'
import InstallPage from '../components/InstallPage'
import ImportLayout from '../layouts/ImportLayout'
import { ImportPage } from '../components/ImportPage'
import DashboardLayout from '../layouts/DashboardLayout'
import { ExtensionsPage } from '../components/Extensions/ExtensionsPage'
import extensionsService from '../services/extensions.service'
import { ExtensionsLayout } from '../layouts/ExtensionsLayout'

export const AppRoutes = () => {
  const extensions = extensionsService.getActiveDashboardExtensionRoutes()
  return (
    <>
      <Routes>
        <Route element={<DashboardLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/extensions"
            element={<ExtensionsPage />}
            handle={{ title: 'Extensions' }}
          />
          <Route path="/contributors" element={<ContributorsPage />} />
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
