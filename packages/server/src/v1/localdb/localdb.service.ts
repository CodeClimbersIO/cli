import { getLocalApiKey } from '../../../utils/localAuth.util'

export class LocalDbService {
  async getLocalApiKey(): Promise<string> {
    return getLocalApiKey()
  }
}
