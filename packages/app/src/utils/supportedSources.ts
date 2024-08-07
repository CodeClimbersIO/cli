import vscodeLogo from '../public/source-logos/vscode.png'
import chromeLogo from '../public/source-logos/chrome.webp'
import firefoxLogo from '../public/source-logos/firefox.webp'

export interface SourceDetails {
  name: string
  displayName: string
  logo: string
  instructions: string
}

export const supportedSources: SourceDetails[] = [
  {
    name: 'vscode',
    displayName: 'Visual Studio Code',
    logo: vscodeLogo,
    instructions: `
      <h2>Installing</h2>
      <p>Press F1 or CMD + Shift + P and type install. Pick Extensions: Install Extension.</p>
      <h2>Searching for plugin</h2>
      <p>Type codeclimbers and hit enter.</p>
      <p>Click Install.</p>
      <p>You may need to reload the editor to activate the extension.</p>
    `,
  },
  {
    name: 'chrome-code_climbers',
    displayName: 'Chrome',
    logo: chromeLogo,
    instructions: `
      <h2>Installing</h2>
      <p>Click the three dots in the top right corner of your browser.</p>
      <p>Click More Tools, then Extensions.</p>
      <p>Click the three dots in the top right corner of the Extensions page.</p>
      <p>Click Open Chrome Web Store.</p>
      <p>Search for CodeClimbers and click Add to Chrome.</p>
      <p>Give the extension permissions to read and change site data if prompted.</p>
    `,
  },
  {
    name: 'firefox-code_climbers',
    displayName: 'Firefox',
    logo: firefoxLogo,
    instructions: `
      <h2>Installing</h2>
      <p>Click the three lines in the top right corner of your browser.</p>
      <p>Click Add-ons.</p>
      <p>Search for CodeClimbers and click Add to Firefox.</p>
      <p>Give the extension permissions to read and change site data if prompted.</p>
    `,
  },
]
