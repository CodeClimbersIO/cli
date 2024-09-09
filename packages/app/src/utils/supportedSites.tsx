import { ReactElement } from 'react'
import { AccountTree } from '@mui/icons-material'

import githubLogo from '../public/source-logos/github.png'
import figmaLogo from '../public/source-logos/figma.png'
import canvaLogo from '../public/source-logos/canva.webp'
import slackLogo from '../public/source-logos/slack.webp'
import linkedInLogo from '../public/source-logos/linkedIn.png'
import youtubeLogo from '../public/source-logos/youtube.png'

export interface SiteDetails {
  name: string
  displayName: string
  logo?: string
  icon?: ReactElement
  type: string
}

export const supportedSites: SiteDetails[] = [
  {
    name: 'github',
    displayName: 'Github',
    logo: githubLogo,
    type: 'code',
  },
  {
    name: 'figma',
    displayName: 'Figma',
    logo: figmaLogo,
    type: 'design',
  },
  {
    name: 'canva',
    displayName: 'Canva',
    logo: canvaLogo,
    type: 'design',
  },
  {
    name: 'slack',
    displayName: 'Slack',
    logo: slackLogo,
    type: 'communication',
  },
  {
    name: 'linkedin',
    displayName: 'LinkedIn',
    logo: linkedInLogo,
    type: 'misc',
  },
  {
    name: 'youtube',
    displayName: 'YouTube',
    logo: youtubeLogo,
    type: 'misc',
  },
  {
    name: 'localhost',
    displayName: 'Localhost',
    icon: <AccountTree fontSize="large" />,
    type: 'code',
  },
]
