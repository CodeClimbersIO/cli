export interface Store {
  put(key: string, enabled: boolean): Promise<void>
  get(key: string): boolean
  has(key: string): boolean
  id(): string
  mayUpdateOnRestart(): Promise<boolean>
}
