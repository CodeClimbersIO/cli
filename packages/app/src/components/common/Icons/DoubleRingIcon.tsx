import { Icon, SvgIconProps } from '@mui/material'

export type DoubleRingIconProps = SvgIconProps

export const DoubleRingIcon = (props: DoubleRingIconProps) => (
  <Icon
    {...props}
    component={(svgProps: SvgIconProps) => (
      <svg
        viewBox="0 0 40 40"
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        className={`${svgProps.className} double-ring-icon`}
      >
        <path d="M9 11L31 11L31 18L28.5931 18L28.5931 14.3693L11.3983 14.3693L11.3983 18L9 18L9 11Z" />
        <path d="M9 22L31 22L31 29L28.5931 29L28.5931 25.3693L11.3983 25.3693L11.3983 29L9 29L9 22Z" />
      </svg>
    )}
  />
)
