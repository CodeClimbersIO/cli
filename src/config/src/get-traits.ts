import { arch, platform, type, version } from 'node:os'
import { readJSON } from './read-json'

export const getTraits = async () => {
  const traits: { [key: string]: string } = {}
  traits['system.arch'] = arch()
  traits['system.version'] = version()
  traits['system.os'] = type()
  traits['system.platform'] = platform()
  try {
    await (async () => {
      const lock = (await readJSON('package-lock.json')) as {
        packages: { [key: string]: { version?: string; resolved: string } }
      }
      for (const pkg of Object.keys(lock.packages)) {
        if (pkg === '') {
          traits['code-climbers.root'] = lock.packages[pkg].version ?? '0.0.0'
        } else if (pkg.startsWith('node_modules/@code-climbers')) {
          if (
            lock.packages[pkg].resolved &&
            lock.packages[pkg].resolved.startsWith('src/')
          ) {
            traits['code-climbers.' + pkg.split('/').pop()] =
              (
                (await readJSON(
                  lock.packages[pkg].resolved + '/package.json',
                )) as { version?: string }
              ).version ?? '0.0.0'
          } else if (lock.packages[pkg].version) {
            traits['code-climbers.' + pkg.split('/').pop()] =
              lock.packages[pkg].version
          } else {
            traits['code-climbers.' + pkg.split('/').pop()] = 'unknown'
          }
        }
      }
    })()
  } catch (error) {
    // @todo log error
  }
  return traits
}
