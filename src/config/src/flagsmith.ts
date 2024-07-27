import { Flag } from './flag'
import { INITIALIZE_WAIT_TIMEOUT, MINIMUM_UPDATE_COOLDOWN } from './constants'
import { Store } from './store'

export class Flagsmith {
  private lastUpdated: number
  private flags: Flag[] = []
  private initialized = false
  private readonly core: { name: string; enabled: boolean }[] = [
    {
      name: 'vscode',
      enabled: true,
    },
  ]
  constructor(
    private readonly config: { environmentKey: string; flagsmithAPI: string },
    private readonly traits: { [name: string]: string },
    private readonly storage: Store,
  ) {
    this.lastUpdated = 0
    for (const flag of this.core) {
      this.storage.has(flag.name)
        ? this.flags.push(
            new Flag(flag.name, flag.enabled, this.storage.get(flag.name)),
          )
        : this.flags.push(new Flag(flag.name, flag.enabled))
      this.storage.put(flag.name, this.flags[this.flags.length - 1].enabled)
    }
    this.loadFlags().then(() => (this.initialized = true))
  }
  async get(flagName: string) {
    await this.loadFlags()
    for (const flag of this.flags) {
      if (flagName === flag.name) {
        return flag
      }
    }
    // @todo log somewhere
    return new Flag(flagName, false, false, false, false)
  }
  private async loadFlags() {
    if (!this.initialized && !(await this.storage.mayUpdateOnRestart())) {
      return
    }
    while (!this.initialized && this.lastUpdated !== 0) {
      await new Promise((resolve) =>
        setTimeout(resolve, INITIALIZE_WAIT_TIMEOUT),
      )
    }
    if (Date.now() - this.lastUpdated < MINIMUM_UPDATE_COOLDOWN) {
      return
    }
    this.lastUpdated = Date.now()
    const base = fetch(this.config.flagsmithAPI + 'flags', {
      headers: {
        'X-Environment-Key': this.config.environmentKey,
      },
    })
    const apiTraits = []
    for (const key of Object.keys(this.traits)) {
      apiTraits.push({
        trait_key: key,
        trait_value: this.traits[key],
      })
    }
    const identity = fetch(this.config.flagsmithAPI + 'identities', {
      headers: {
        'X-Environment-Key': this.config.environmentKey,
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        identifier: this.storage.id(),
        traits: apiTraits,
      }),
    })
    try {
      const data = await Promise.all([base, identity])
      const [envList, idList] = await Promise.all([
        data[0].json(),
        data[1].json(),
      ])
      console.log(envList, idList)
      const flags: Flag[] = []
      for (const flag of this.core) {
        for (const env of envList) {
          if (env.feature.name === flag.name) {
            for (const id of idList.flags) {
              if (id.feature.name === flag.name) {
                flags.push(
                  new Flag(
                    flag.name,
                    flag.enabled,
                    this.storage.get(flag.name),
                    typeof env.feature_state_value === 'boolean'
                      ? env.feature_state_value
                      : env.feature_state_value === 'true',
                    typeof id.feature_state_value === 'boolean'
                      ? id.feature_state_value
                      : id.feature_state_value === 'true',
                  ),
                )
                await this.storage.put(
                  flag.name,
                  flags[flags.length - 1].enabled,
                )
              }
            }
          }
        }
      }
      this.flags = flags
    } catch (error) {
      // @todo logging
    }
    console.log(this.flags)
  }
}
