import { Store } from './store'
import { existsSync, writeFile, readFileSync } from 'node:fs'
import { MINIMUM_UPDATE_ON_RESTART_COOLDOWN } from './constants'
import { v4 as uuidv4 } from 'uuid'
const file = './codeclimbers.identity'

export class FileStore implements Store {
  private readonly memory: { [key: string]: boolean } = {}
  private readonly uuid: string
  private lastUpdate = 0
  constructor() {
    if (!existsSync(file)) {
      this.uuid = uuidv4()
      return
    }
    const data = readFileSync(file, 'utf8')
    if (!data) {
      this.uuid = uuidv4()
      return
    }
    const obj = JSON.parse(data)
    if (!obj || typeof obj !== 'object') {
      this.uuid = uuidv4()
      return
    }
    this.lastUpdate = typeof obj.lastUpdated === 'number' ? obj.lastUpdated : 0
    this.uuid =
      obj.uuid &&
      typeof obj.uuid === 'string' &&
      obj.uuid.match(
        /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
      )
        ? obj.uuid
        : uuidv4()
    if (obj.flags && typeof obj.flags === 'object') {
      for (const key of Object.keys(obj.flags)) {
        if (typeof obj.flags[key] === 'boolean') {
          this.memory[key] = obj.flags[key]
        }
      }
    }
  }
  get(key: string): boolean {
    return this.memory[key] ?? false
  }
  has(key: string): boolean {
    return typeof this.memory[key] === 'boolean'
  }
  id(): string {
    return this.uuid
  }
  async mayUpdateOnRestart(): Promise<boolean> {
    const now = Date.now()
    if (now > this.lastUpdate + MINIMUM_UPDATE_ON_RESTART_COOLDOWN) {
      this.lastUpdate = now
      await this.save()
      return true
    }
    return false
  }
  private async save(): Promise<void> {
    return new Promise((resolve) =>
      writeFile(
        file,
        JSON.stringify({
          uuid: this.uuid,
          flags: this.memory,
          lastUpdate: this.lastUpdate,
        }),
        'utf8',
        () => resolve(undefined),
      ),
    )
  }
  async put(key: string, value: boolean): Promise<void> {
    if (this.memory[key] === value) {
      return
    }
    this.memory[key] = value
    await this.save()
  }
}
