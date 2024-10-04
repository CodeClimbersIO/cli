import bossImage from '@app/assets/icons/boss.png'
type Props = {
  width?: number
  height?: number
} & React.ImgHTMLAttributes<HTMLImageElement>

export const BossImage = ({ width = 32, height = 32, ...props }: Props) => {
  return (
    <img src={bossImage} alt="Boss" width={width} height={height} {...props} />
  )
}
