import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon'

// Thank you! https://github.com/mui/material-ui/issues/35218#issuecomment-1977984142
export const NotificationIcon = (props: SvgIconProps) => (
  <SvgIcon {...props} viewBox="0 0 16 16">
    <path
      d="M0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8Z"
      fill="#FF9581"
    />
    <path
      d="M8.82884 3.27273L8.68821 9.43466H7.31605L7.17969 3.27273H8.82884ZM8.00213 12.0938C7.74361 12.0938 7.52202 12.0028 7.33736 11.821C7.15554 11.6392 7.06463 11.4176 7.06463 11.1562C7.06463 10.9006 7.15554 10.6818 7.33736 10.5C7.52202 10.3182 7.74361 10.2273 8.00213 10.2273C8.25497 10.2273 8.47372 10.3182 8.65838 10.5C8.84588 10.6818 8.93963 10.9006 8.93963 11.1562C8.93963 11.3295 8.8956 11.4872 8.80753 11.6293C8.7223 11.7713 8.60866 11.8849 8.46662 11.9702C8.32741 12.0526 8.17259 12.0938 8.00213 12.0938Z"
      fill={props.color}
    />
  </SvgIcon>
)
