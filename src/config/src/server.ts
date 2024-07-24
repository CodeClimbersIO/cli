import Flagsmith, { Flags } from 'flagsmith-nodejs'
import { WebSocketServer } from 'ws'
import { type } from 'node:os'

export default async (
  port: number,
  environmentKey: string,
  serverPort: number,
) => {
  if (!environmentKey) {
    throw Error(`Invalid environment key.`)
  }
  const flagsmith = new Flagsmith({
    environmentKey,
  })
  const traits: { [key: string]: number } = {}
  traits[type()] = 1
  const identity = await (
    await fetch(`127.0.0.1:${serverPort}/api/v1/identity`)
  ).json()
  const flagsPromise = flagsmith.getIdentityFlags(identity.uuid, traits)
  const wss = new WebSocketServer({ port })
  wss.on('connection', (ws: WebSocketServer) => {
    let flags: undefined | Flags
    ws.on(`message`, async (data: string) => {
      flags = flags ?? (await flagsPromise)
      ws.send(flags.getFlag(data))
    })
    ws.send({ ready: true })
  })
}
