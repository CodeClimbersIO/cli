import activitiesUtil from '../activities.util'

describe('getSourceFromUserAgent', () => {
  it(`should return 'vscode' as source of userAgents`, () => {
    const userAgents = [
      'wakatime/v1.98.1 (windows-10.0.22631.3880-unknown) go1.22.5 vscode/1.91.1 vscode-climbers/0.0.0',
      'wakatime/v1.98.1 (windows-10.0.22631.3880-unknown) go1.22.5 vscode/1.91.1 vscode-wakatime/24.6.0',
      'wakatime/v1.98.3 (windows-10.0.22631.3880-unknown) go1.22.5 vscode/1.91.1 vscode-climbers/0.0.0',
      'wakatime/v1.98.3 (windows-10.0.22631.3880-unknown) go1.22.5 vscode/1.91.1 vscode-wakatime/24.6.0',
    ]

    const result = userAgents.map((userAgent) => {
      return activitiesUtil.getSourceFromUserAgent(userAgent)
    })

    expect(result).toEqual(['vscode', 'vscode', 'vscode', 'vscode'])
  })
})
