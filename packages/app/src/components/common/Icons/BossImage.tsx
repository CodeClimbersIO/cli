import happyBoss from '@app/assets/icons/boss_happy.png'
import angryBoss from '@app/assets/icons/boss_angry.png'
import neutralBoss from '@app/assets/icons/boss_neutral.png'

type Props = {
  width?: number
  height?: number
  variant?: 'happy' | 'angry' | 'neutral'
} & React.ImgHTMLAttributes<HTMLImageElement>

export const BossImage = ({
  width = 32,
  height = 32,
  variant = 'happy',
  ...props
}: Props) => {
  let bossImage = neutralBoss
  if (variant === 'happy') bossImage = happyBoss
  if (variant === 'angry') bossImage = angryBoss
  return (
    <img src={bossImage} alt="Boss" width={width} height={height} {...props} />
  )
}
