import { Outlet } from 'react-router-dom'

interface BaseLayoutProps {
  children?: React.ReactNode
}

const BaseLayout = ({ children }: BaseLayoutProps) => {
  return <>{children || <Outlet />}</>
}

export { BaseLayout }
