/**
 * This file contains utility functions for local authentication.
 *
 * The method used to verify auth is a local api key that is stored in an ini file at the location ~/.codeclimbers.cfg
 * The api key is stored in the [settings] section as local_api_key=<api_key>
 * The file also stores a setting for whether or not the local_api_key can be read from the ini file.
 * This value starts as true but is set to false when the local_api_key is read.
 *
 * The authentication assumes that the first application to access the key is the one that should have access to the database.
 * An import / recovery process will be implemented that allows the user to retrieve the key and set it to give access to
 * a client application of their choosing if it's not the first application to access the key.
 */

import fs from 'node:fs/promises'
import { readIniFile, stringifyIni } from './ini.util'
import { CODE_CLIMBER_INI_PATH } from './node.util'
import { Logger } from '@nestjs/common'
import { CodeClimberError } from './codeClimberErrors'
import { existsSync } from 'node:fs'

export async function isValidLocalApiKey(apiKey: string): Promise<boolean> {
  try {
    const iniConfig = await readIniFile(CODE_CLIMBER_INI_PATH)
    if (iniConfig.settings.local_api_key !== apiKey) {
      throw new CodeClimberError.ApiKeyInvalid()
    }
    return true
  } catch (error) {
    if (error instanceof CodeClimberError.ApiKeyInvalid) {
      throw error
    }
    Logger.error('Error validating local api key:', error)
    return false
  }
}

async function setLocalApiKey(apiKey: string): Promise<void> {
  try {
    const iniConfig = await readIniFile(CODE_CLIMBER_INI_PATH)
    iniConfig.settings.local_api_key = apiKey
    iniConfig.settings.local_api_key_readable = 'false'
    const iniContent = stringifyIni(iniConfig)
    await fs.writeFile(CODE_CLIMBER_INI_PATH, iniContent, 'utf8')
  } catch (error) {
    Logger.error('Error setting local api key:', error)
  }
}

export async function getLocalApiKey(isAdmin = false): Promise<string | null> {
  try {
    if (!existsSync(CODE_CLIMBER_INI_PATH)) {
      const iniContent = stringifyIni({ settings: {} })
      await fs.writeFile(CODE_CLIMBER_INI_PATH, iniContent, 'utf8')
    }
    const iniConfig = await readIniFile(CODE_CLIMBER_INI_PATH)

    if (!iniConfig.settings.local_api_key) {
      // generate a new key as guid
      const newKey = crypto.randomUUID()
      await setLocalApiKey(newKey)
      return newKey
    } else if (
      iniConfig.settings.local_api_key_readable === 'false' &&
      !isAdmin
    ) {
      throw new CodeClimberError.LocalApiKeyUnavailable()
    }
    await setLocalApiKeyReadable(false)
    return iniConfig.settings.local_api_key
  } catch (error) {
    if (error instanceof CodeClimberError.LocalApiKeyUnavailable) {
      throw error
    }
    Logger.error(`Error getting local api key: ${error}`)
    return null
  }
}

export async function setLocalApiKeyReadable(readable: boolean): Promise<void> {
  try {
    const iniConfig = await readIniFile(CODE_CLIMBER_INI_PATH)
    iniConfig.settings.local_api_key_readable = readable.toString()
    const iniContent = stringifyIni(iniConfig)
    await fs.writeFile(CODE_CLIMBER_INI_PATH, iniContent, 'utf8')
  } catch (error) {
    Logger.error('Error setting local api key readable:', error)
  }
}
