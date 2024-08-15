/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs')
const path = require('path')
// Read root package.json
const rootPackage = JSON.parse(fs.readFileSync('package.json', 'utf8'))
const rootDeps = new Set(Object.keys(rootPackage.dependencies || {}))

// Get workspace directories
const workspaces = rootPackage.workspaces || []

let missingDeps = new Set()
let unusedDeps = new Set(rootDeps)

// Check each workspace
workspaces.forEach((dir) => {
  if (fs.existsSync(path.join(dir, 'package.json'))) {
    const packageJson = JSON.parse(
      fs.readFileSync(path.join(dir, 'package.json'), 'utf8'),
    )
    const deps = new Set([...Object.keys(packageJson.dependencies || {})])
    // Check for missing dependencies
    deps.forEach((dep) => {
      if (!rootDeps.has(dep)) {
        missingDeps.add(dep)
      }
      unusedDeps.delete(dep)
    })
    unusedDeps.delete('@oclif/core')
    unusedDeps.delete('@oclif/plugin-warn-if-update-available')
    unusedDeps.delete('@codeclimbers/config')
    // used in commands which has no package.json
    unusedDeps.delete('find-process')
    unusedDeps.delete('server')
    unusedDeps.delete('open')
    unusedDeps.delete('picocolors')
  }
})

missingDeps.delete('@codeclimbers/server')
// Report results
if (missingDeps.size > 0) {
  console.error(
    'ERROR: The following dependencies are missing from the root package.json:',
  )
  missingDeps.forEach((dep) => console.error(`  - ${dep}`))
  process.exitCode = 1
}

if (unusedDeps.size > 0) {
  console.warn(
    'WARNING: The following dependencies in root package.json are not used in any submodule:',
  )
  unusedDeps.forEach((dep) => console.warn(`  - ${dep}`))
}

if (missingDeps.size === 0 && unusedDeps.size === 0) {
  console.log('All dependencies are correctly configured.')
}
