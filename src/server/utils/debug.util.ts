import AppLogger from './appLogger.util'
interface Reg {
  fast_slash: boolean
}
interface Layer {
  route: {
    stack: Layer[]
    path: string
  }
  regexp: Reg
  name: string
  handle: {
    stack: Layer[]
  }
  method: 'get' | 'post' | 'put' | 'delete'
}
/* eslint-disable @typescript-eslint/no-explicit-any */
export function printRoutes(path: string[], layer: Layer) {
  if (layer.route) {
    layer.route.stack.forEach(
      printRoutes.bind(null, path.concat(split(layer.route.path))),
    )
  } else if (layer.name === 'router' && layer.handle.stack) {
    layer.handle.stack.forEach(
      printRoutes.bind(null, path.concat(split(layer.regexp))),
    )
  } else if (layer.method) {
    AppLogger.info(
      '%s /%s',
      layer.method.toUpperCase(),
      path.concat(split(layer.regexp)).filter(Boolean).join('/'),
    )
  }
}

export function split(thing: string | Reg) {
  if (typeof thing === 'string') {
    return thing.split('/')
  } else if (thing.fast_slash) {
    return ''
  } else {
    const match = thing
      .toString()
      .replace('\\/?', '')
      .replace('(?=\\/|$)', '$')
      .match(/^\/\^((?:\\[.*+?^${}()|[\]\\/]|[^.*+?^${}()|[\]\\/])*)\$\//)
    return match
      ? match[1].replace(/\\(.)/g, '$1').split('/')
      : '<complex:' + thing.toString() + '>'
  }
}
