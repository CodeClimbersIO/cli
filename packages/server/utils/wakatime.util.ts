import * as fs from 'fs/promises'
import * as path from 'path'
import { HOME_DIR } from './node.util'
import { Logger } from '@nestjs/common'

// Define the file path (adjust as needed)
const filePath: string = path.join(HOME_DIR, '.wakatime.cfg')

// Define types
type IniSection = Record<string, string>
export type IniConfig = Record<string, IniSection>

// Function to parse INI content
export function parseIni(content: string): IniConfig {
  const result: IniConfig = {}
  const lines: string[] = content.split('\n')
  let currentSection = ''

  for (const line of lines) {
    const trimmedLine: string = line.trim()
    if (trimmedLine.startsWith('[') && trimmedLine.endsWith(']')) {
      currentSection = trimmedLine.slice(1, -1)
      result[currentSection] = {}
    } else if (trimmedLine && currentSection) {
      const [key, value] = trimmedLine.split('=').map((part) => part.trim())
      if (key && value) {
        result[currentSection][key] = value
      }
    }
  }

  return result
}

// Function to stringify INI content
export function stringifyIni(data: IniConfig): string {
  const entries = Object.entries(data)
    .map(([section, entries]) => {
      const sectionContent: string = Object.entries(entries)
        .map(([key, value]) => `${key} = ${value}`)
        .join('\n')
      return `[${section}]\n${sectionContent}`
    })
    .join('\n\n')
  return `${entries}\n`
}

export async function updateSettings(
  newSettings: Record<string, string>,
): Promise<void> {
  try {
    let config: IniConfig

    try {
      // Try to read the existing file
      const data: string = await fs.readFile(filePath, 'utf8')
      config = parseIni(data)
    } catch (error) {
      // File doesn't exist, create a new configuration
      config = { settings: {} }
    }

    // Ensure the 'settings' section exists
    if (!config.settings) {
      config.settings = {}
    }

    // Update the settings
    Object.assign(config.settings, newSettings)

    // Write the updated content back to the file
    const updatedContent: string = stringifyIni(config)
    await fs.writeFile(filePath, updatedContent, 'utf8')
    Logger.debug('File updated successfully', 'WakatimeUtil')
  } catch (error) {
    Logger.error('Error updating file:', error)
  }
}
