import vscodeLogo from '@app/assets/source-logos/vscode.png'
import chromeLogo from '@app/assets/source-logos/chrome.webp'
import { RiderIcon } from '../assets/source-logos/jetbrains/RiderIcon'
import { IntellijIcon } from '../assets/source-logos/jetbrains/IntellijIcon'
import { PyCharmIcon } from '../assets/source-logos/jetbrains/PyCharmIcon'
import { WebstormIcon } from '../assets/source-logos/jetbrains/WebstormIcon'
import { PhpStormIcon } from '../assets/source-logos/jetbrains/PhpStormIcon'
import { RustRoverIcon } from '../assets/source-logos/jetbrains/RustRover'
import { CLionIcon } from '../assets/source-logos/jetbrains/CLionIcon'
import { GoLandIcon } from '../assets/source-logos/jetbrains/GoLandIcon'
import { RubyMineIcon } from '../assets/source-logos/jetbrains/RubyMineIcon'
export interface AppDetails {
  name: string
  displayName: string
  logo: string | React.FC<{ size?: number }>
  type: string
  logoType?: string
}

export interface SourceDetails {
  name: string
  subApps?: AppDetails[]
  displayName: string
  link: string
  logo: string | React.FC<{ size?: number }>
  logoType?: string
  instructions: string
  type: string
}

export const supportedSources: SourceDetails[] = [
  {
    name: 'vscode',
    displayName: 'Visual Studio Code',
    logo: vscodeLogo,
    link: 'https://marketplace.visualstudio.com/items?itemName=CodeClimbers.vscode-codeclimbers',
    instructions: `
      <li>Press F1 or CMD + Shift + P and type install. Pick Extensions: Install Extension.</li>
      <li>Type codeclimbers and hit enter.</li>
      <li>Click Install.</li>
      <li>You may need to reload the editor to activate the extension.</li>
    `,
    type: 'code',
  },
  {
    name: 'jetbrains',
    subApps: [
      {
        name: 'intellij',
        displayName: 'IntelliJ IDEA',
        logo: IntellijIcon,
        type: 'code',
      },
      {
        name: 'pycharm',
        displayName: 'PyCharm',
        logo: PyCharmIcon,
        type: 'code',
      },
      {
        name: 'rider',
        displayName: 'Rider',
        logo: RiderIcon,
        type: 'code',
        logoType: 'svg',
      },
      {
        name: 'webstorm',
        displayName: 'WebStorm',
        logo: WebstormIcon,
        type: 'code',
        logoType: 'svg',
      },
      {
        name: 'goland',
        displayName: 'GoLand',
        logo: GoLandIcon,
        type: 'code',
        logoType: 'svg',
      },
      {
        name: 'clion',
        displayName: 'CLion',
        logo: CLionIcon,
        type: 'code',
        logoType: 'svg',
      },
      {
        name: 'phpstorm',
        displayName: 'PHPStorm',
        logo: PhpStormIcon,
        type: 'code',
        logoType: 'svg',
      },
      {
        name: 'rustrover',
        displayName: 'Rust Rover',
        logo: RustRoverIcon,
        type: 'code',
        logoType: 'svg',
      },
      {
        name: 'rubymine',
        displayName: 'RubyMine',
        logo: RubyMineIcon,
        type: 'code',
        logoType: 'svg',
      },
    ],
    displayName: 'JetBrains IDEs',
    logo: IntellijIcon,
    logoType: 'svg',
    link: 'https://plugins.jetbrains.com/plugin/25345-codeclimbers',
    instructions: `
      <span><b>Supported IDEs:</b> IntelliJ, PyCharm, Rider, WebStorm, GoLand, CLion, PHPStorm, Rust Rover, RubyMine</span>
      <br />
      <li>Settings > Plugins.</li>
      <li>Type codeclimbers and hit enter.</li>
      <li>Click Install.</li>
      <li>You may need to reload the editor to activate the extension.</li>
    `,
    type: 'code',
  },
  {
    name: 'chrome',
    displayName: 'Chromium Browser',
    logo: chromeLogo,
    link: 'https://chromewebstore.google.com/detail/code-climbers/fdmoefklpgbjapealpjfailnmalbgpbe',
    instructions: `
      <li>Click the three dots in the top right corner of your browser.</li>
      <li>Click More Tools, then Extensions.</li>
      <li>Click the three dots in the top right corner of the Extensions page.</li>
      <li>Click Open Chrome Web Store.</li>
      <li>Search for CodeClimbers and click Add to Chrome.</li>
      <li>Give the extension permissions to read and change site data if prompted.</li>
    `,
    type: 'web',
  },

  // Firefox is not supported yet
  // {
  //   name: 'firefox-code_climbers',
  //   displayName: 'Firefox',
  //   logo: firefoxLogo,
  //   instructions: `
  //     <h2>Installing</h2>
  //     <p>Click the three lines in the top right corner of your browser.</p>
  //     <p>Click Add-ons.</p>
  //     <p>Search for CodeClimbers and click Add to Firefox.</p>
  //     <p>Give the extension permissions to read and change site data if prompted.</p>
  //   `,
  // },
]
