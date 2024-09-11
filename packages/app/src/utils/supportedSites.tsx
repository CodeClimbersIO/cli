import { ReactElement } from 'react'
import { AccountTree } from '@mui/icons-material'

import githubLogo from '../public/source-logos/github.png'
import figmaLogo from '../public/source-logos/figma.png'
import canvaLogo from '../public/source-logos/canva.webp'
import slackLogo from '../public/source-logos/slack.webp'
import linkedInLogo from '../public/source-logos/linkedIn.png'
import youtubeLogo from '../public/source-logos/youtube.png'
import gmailLogo from '../public/source-logos/gmail.png'
import claudeLogo from '../public/source-logos/claude.png'
import chatgptLogo from '../public/source-logos/chatgpt.png'
import outlookLogo from '../public/source-logos/outlook.png'
import linearLogo from '../public/source-logos/linear.svg'
import jiraLogo from '../public/source-logos/jira.png'
import stackoverflowLogo from '../public/source-logos/stackoverflow.png'

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
    name: 'gmail',
    displayName: 'Gmail',
    logo: gmailLogo,
    type: 'communication',
  },
  {
    name: 'claudeai',
    displayName: 'Claude AI',
    logo: claudeLogo,
    type: 'misc',
  },
  {
    name: 'chatgpt',
    displayName: 'Chat GPT',
    logo: chatgptLogo,
    type: 'misc',
  },
  {
    name: 'outlook',
    displayName: 'Outlook',
    logo: outlookLogo,
    type: 'communication',
  },
  {
    name: 'linear',
    displayName: 'Linear',
    logo: linearLogo,
    type: 'misc',
  },
  {
    name: 'jira',
    displayName: 'Jira',
    logo: jiraLogo,
    type: 'misc',
  },
  {
    name: 'stackoverflow',
    displayName: 'Stack Overflow',
    logo: stackoverflowLogo,
    type: 'code',
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
