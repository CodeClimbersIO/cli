// TODO: add tests for localAuth.util.ts

import { removeIniFile } from '../ini.util'
import { getLocalApiKey, isValidLocalApiKey } from '../localAuth.util'
import { existsSync } from 'fs'
import { CODE_CLIMBER_INI_PATH } from '../node.util'

describe('localAuth.util', () => {
  beforeEach(async () => {
    if (existsSync(CODE_CLIMBER_INI_PATH)) {
      await removeIniFile(CODE_CLIMBER_INI_PATH)
    }
  })
  describe('getLocalApiKey', () => {
    it('should get local api key', async () => {
      const result = await getLocalApiKey()
      expect(result).toBeDefined()
      expect(result).toHaveLength(36)
    })
    it('should throw error if second call to getLocalApiKey is made', async () => {
      await expect(async () => {
        await getLocalApiKey()
        await getLocalApiKey()
      }).rejects.toThrow('not available')
    })
  })
  describe('isValidLocalApiKey', () => {
    it('should return true if local api key is set', async () => {
      const apiKey = await getLocalApiKey()
      const result = await isValidLocalApiKey(apiKey)
      expect(result).toBe(true)
    })
    it('should throw error if api key is invalid', async () => {
      await getLocalApiKey()
      await expect(async () => {
        await isValidLocalApiKey('bad-key')
      }).rejects.toThrow('invalid')
    })
  })
})
