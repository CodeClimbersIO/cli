import WebSocket, { WebSocketServer } from 'ws'
import { Flagsmith } from './flagsmith.js'
import { WEBSOCKET_REFRESH_COOLDOWN } from './constants'
import { FileStore } from './file-store'
import { getTraits } from './get-traits'

export default async (
  port: number,
  environmentKey: string,
  flagsmithAPI: string,
) => {
  if (!environmentKey) {
    throw Error(`Invalid environment key.`)
  }
  const flagsmith = new Flagsmith(
    {
      environmentKey,
      flagsmithAPI,
    },
    await getTraits(),
    new FileStore(),
  )
  const wss = new WebSocketServer({ port })
  wss.on('connection', (ws: WebSocket) => {
    const requested: { [key: string]: string } = {}
    const send = async (flag: string) => {
      const result = await flagsmith.get(flag)
      const previous = requested[flag] ?? ''
      requested[flag] = JSON.stringify(result)
      if (requested[flag] !== previous) {
        ws.send(requested[flag])
      }
    }
    ws.on(`message`, send)
    const interval = setInterval(() => {
      for (const requestedFlag of Object.keys(requested)) {
        send(requestedFlag)
      }
    }, WEBSOCKET_REFRESH_COOLDOWN)
    ws.on('close', () => {
      clearInterval(interval)
    })
  })
}
