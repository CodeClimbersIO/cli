import { Icon, SvgIconProps } from '@mui/material'

export type RingIconProps = SvgIconProps

export const RingIcon = (props: RingIconProps) => (
  <Icon
    {...props}
    component={(svgProps: SvgIconProps) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        version="1.1"
        className={`${svgProps.className} ring-icon`}
      >
        <path d="M 5.398438 9.601562 L 18.601562 9.601562 L 18.601562 13.800781 L 17.15625 13.800781 L 17.15625 11.621094 L 6.839844 11.621094 L 6.839844 13.800781 L 5.398438 13.800781 Z M 5.398438 9.601562" />
      </svg>
    )}
  />
)
