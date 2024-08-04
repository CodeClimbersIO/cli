import vscodeLogo from '../public/source-logos/vscode.png'

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
      <h2>Installing</h2>
      <p>Enter your API Key, then press enter.</p>
      <p>(If you’re not prompted, press F1 or CMD + Shift + P then type CodeClimber's API Key.)</p>
      <h2>Enter API Key</h2>
      <p>Use VS Code like you normally do and your coding activity will be displayed on your CodeClimber's Dashboard.</p>
    `,
  },
]
