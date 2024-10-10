/* eslint-disable codeclimbers/use-code-climbers-button */
// eslint-disable-next-line import/no-named-as-default
import posthog from 'posthog-js'
import { IconButton, IconButtonProps } from '@mui/material'

type Props = IconButtonProps & {
  eventName: string
  href?: string
  target?: string
}

const CodeClimbersIconButton = ({
  eventName,
  children,
  onClick,
  ...props
}: Props) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    posthog.capture(eventName)
    onClick?.(e)
  }
  return (
    <IconButton onClick={handleClick} {...props}>
      {children}
    </IconButton>
  )
}

export { CodeClimbersIconButton }
