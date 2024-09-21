// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isBrowserCli = (import.meta as any).env === undefined

export const extractVersions = (version: string) => {
  const [major, minor, patch] = version.split('.').map(Number)
  return { major, minor, patch }
}
