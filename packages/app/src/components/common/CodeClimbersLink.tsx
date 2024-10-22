/* eslint-disable codeclimbers/use-code-climbers-button */
import { Link, LinkProps } from '@mui/material'
// eslint-disable-next-line import/no-named-as-default
import posthog from 'posthog-js'

type Props = LinkProps & {
  eventName: string
}
const CodeClimbersLink = ({
  eventName,
  children,
  onClick,
  ...props
}: Props) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    posthog.capture(eventName)
    onClick?.(e)
  }
  return (
    <Link onClick={handleClick} {...props}>
      {children}
    </Link>
  )
}

export { CodeClimbersLink }
