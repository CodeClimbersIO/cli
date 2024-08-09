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
          traits['codeclimbers.root'] = lock.packages[pkg].version ?? '0.0.0'
        } else if (pkg.startsWith('node_modules/@codeclimbers')) {
          if (
            lock.packages[pkg].resolved &&
            lock.packages[pkg].resolved.startsWith('src/')
          ) {
            traits['codeclimbers.' + pkg.split('/').pop()] =
              (
                (await readJSON(
                  lock.packages[pkg].resolved + '/package.json',
                )) as { version?: string }
              ).version ?? '0.0.0'
          } else if (lock.packages[pkg].version) {
            traits['codeclimbers.' + pkg.split('/').pop()] =
              lock.packages[pkg].version
          } else {
            traits['codeclimbers.' + pkg.split('/').pop()] = 'unknown'
          }
        }
      }
    })()
  } catch (error) {
    // @todo log error
  }
  return traits
}
