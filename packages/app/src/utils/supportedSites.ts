import vscodeLogo from '../public/source-logos/vscode.png'
import chromeLogo from '../public/source-logos/chrome.webp'
// import firefoxLogo from "../public/source-logos/firefox.webp";

export interface SiteDetails {
  name: string
  displayName: string
  logo: string
  type: string
}

export const supportedSites: SiteDetails[] = [
  {
    name: 'github',
    displayName: 'Github',
    logo: vscodeLogo,
    type: 'code',
  },
  {
    name: 'figma',
    displayName: 'Figma',
    logo: chromeLogo,
    type: 'design',
  },
  {
    name: 'canva',
    displayName: 'Canva',
    logo: chromeLogo,
    type: 'design',
  },
  {
    name: 'email',
    displayName: 'Email',
    logo: chromeLogo,
    type: 'communication',
  },
  {
    name: 'linkedin',
    displayName: 'LinkedIn',
    logo: chromeLogo,
    type: 'misc',
  },
  {
    name: 'youtube',
    displayName: 'YouTube',
    logo: chromeLogo,
    type: 'misc',
  },
  {
    name: 'localhost',
    displayName: 'Localhost',
    logo: chromeLogo,
    type: 'code',
  },
]
