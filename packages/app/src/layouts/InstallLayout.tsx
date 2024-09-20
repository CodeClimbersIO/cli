import { Outlet } from 'react-router-dom'

interface BaseLayoutProps {
  children?: React.ReactNode
}

function BaseLayout({ children }: BaseLayoutProps) {
  return <>{children || <Outlet />}</>
}

export default BaseLayout
