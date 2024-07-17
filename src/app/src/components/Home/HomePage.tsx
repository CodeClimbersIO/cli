import { LatestPulsesComponent } from './LatestPulses'
import Logo from './Logo'

export const HomePage = () => {
  return (
    <div>
      <Logo />
      <h1>Home</h1>
      <LatestPulsesComponent />
    </div>
  )
}
