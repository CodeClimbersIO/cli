import { Route, Routes } from 'react-router-dom'

import { ImportPage } from '../components/ImportPage'
import { ExtensionsPage } from '../components/Extensions/ExtensionsPage'
import { ExtensionsLayout } from '../layouts/ExtensionsLayout'
import { ContributorsPage } from '../components/ContributorsPage'
import { getActiveDashboardExtensionRoutes } from '../services/extensions.service'
import { InstallPage } from '../components/InstallPage'
import { DashboardLayout } from '../layouts/DashboardLayout'
import { ImportLayout } from '../layouts/ImportLayout'
import { ReportsPage } from '../components/WeeklyReports/ReportsPage'
import { HomePage } from '../components/Home/HomePage'
import { GameMakersPage } from '../components/GameMakers/GameMakersPage'

export const AppRoutes = () => {
  const extensions = getActiveDashboardExtensionRoutes()
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
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/gamemakers" element={<GameMakersPage />} />
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
