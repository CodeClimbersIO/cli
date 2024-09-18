import {
  getLocalApiKey,
  isValidLocalApiKey,
} from '../../../utils/localAuth.util'

export class LocalAuthService {
  async getLocalApiKey(): Promise<string> {
    return getLocalApiKey()
  }
  async isValidLocalApiKey(apiKey: string): Promise<boolean> {
    return isValidLocalApiKey(apiKey)
  }
}
