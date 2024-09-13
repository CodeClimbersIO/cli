import { ReactElement } from 'react'
import { AccountTree } from '@mui/icons-material'

import githubLogo from '@app/assets/source-logos/github.png'
import figmaLogo from '@app/assets/source-logos/figma.png'
import canvaLogo from '@app/assets/source-logos/canva.webp'
import slackLogo from '@app/assets/source-logos/slack.webp'
import linkedInLogo from '@app/assets/source-logos/linkedIn.png'
import youtubeLogo from '@app/assets/source-logos/youtube.png'
import gmailLogo from '@app/assets/source-logos/gmail.png'
import claudeLogo from '@app/assets/source-logos/claude.png'
import chatgptLogo from '@app/assets/source-logos/chatgpt.png'
import outlookLogo from '@app/assets/source-logos/outlook.png'
import linearLogo from '@app/assets/source-logos/linear.svg'
import jiraLogo from '@app/assets/source-logos/jira.png'
import stackoverflowLogo from '@app/assets/source-logos/stackoverflow.png'

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
