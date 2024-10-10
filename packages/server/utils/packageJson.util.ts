// src/utils/package-json.util.ts

import { readFileSync } from 'fs'
import { join } from 'path'
import { PROJECT_ROOT } from './node.util'

interface PackageJson {
  version: string
  [key: string]: string | number | boolean | null | undefined
}

export const getPackageJsonVersion = (): string => {
  const packageJsonPath = join(PROJECT_ROOT, 'package.json')
  const packageJsonContent = readFileSync(packageJsonPath, 'utf-8')
  const packageJson: PackageJson = JSON.parse(packageJsonContent)
  return packageJson.version
}
