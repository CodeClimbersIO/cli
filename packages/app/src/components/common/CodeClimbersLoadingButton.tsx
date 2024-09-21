/* eslint-disable codeclimbers/use-code-climbers-button */
// eslint-disable-next-line import/no-named-as-default
import posthog from 'posthog-js'
import { LoadingButton, LoadingButtonProps } from '@mui/lab'

type Props = LoadingButtonProps & {
  eventName: string
  target?: string
}

const CodeClimbersLoadingButton = ({
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
    <LoadingButton onClick={handleClick} {...props}>
      {children}
    </LoadingButton>
  )
}

export default CodeClimbersLoadingButton
