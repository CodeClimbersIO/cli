/* eslint-disable codeclimbers/use-code-climbers-button */
// eslint-disable-next-line import/no-named-as-default
import posthog from 'posthog-js'
import { Button, ButtonProps } from '@mui/material'

type Props = ButtonProps & {
  eventName: string
  target?: string
}

const CodeClimbersButton = ({
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
    <Button onClick={handleClick} {...props}>
      {children}
    </Button>
  )
}

export default CodeClimbersButton
