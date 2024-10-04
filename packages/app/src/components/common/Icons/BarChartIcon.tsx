import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon'

// Thank you! https://github.com/mui/material-ui/issues/35218#issuecomment-1977984142
export const BarChartIcon = (props: SvgIconProps) => (
  <SvgIcon {...props} viewBox="0 0 28 28">
    <path
      d="M20.6667 27.3333V15.6666H27.3333V27.3333H20.6667ZM10.6667 27.3333V0.666626H17.3333V27.3333H10.6667ZM0.666672 27.3333V8.99996H7.33334V27.3333H0.666672Z"
      fill={props.color}
    />
  </SvgIcon>
)
