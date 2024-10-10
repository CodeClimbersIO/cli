export const forOwn = <T>(
  obj: Record<string, T>,
  iteratee: (value: T, key: string, obj: Record<string, T>) => void,
): void => {
  if (obj === null || obj === undefined) {
    return
  }

  const keys = Object.keys(obj)
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i]
    iteratee(obj[key], key, obj)
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isPlainObject = (value: any): boolean => {
  if (typeof value !== 'object' || value === null) {
    return false
  }

  const prototype = Object.getPrototypeOf(value)
  if (prototype === null) {
    return true
  }

  const constructor = prototype.constructor
  if (typeof constructor !== 'function') {
    return false
  }

  const constructorString = Function.prototype.toString.call(constructor)
  return (
    constructorString.indexOf('[native code]') !== -1 && constructor === Object
  )
}

export const snakeCase = (str: string): string => {
  if (typeof str !== 'string') {
    return ''
  }

  const result: string[] = []
  let currentWord = ''

  for (let i = 0; i < str.length; i++) {
    const char = str[i]
    const nextChar = str[i + 1]

    if (char === ' ' || char === '-') {
      if (currentWord) {
        result.push(currentWord.toLowerCase())
        currentWord = ''
      }
    } else if (char >= 'A' && char <= 'Z') {
      if (currentWord && nextChar && !(nextChar >= 'A' && nextChar <= 'Z')) {
        result.push(currentWord.toLowerCase())
        currentWord = ''
      }
      currentWord += char.toLowerCase()
    } else {
      currentWord += char
    }
  }

  if (currentWord) {
    result.push(currentWord.toLowerCase())
  }

  return result.join('_')
}

export const camelCase = (str: string): string => {
  if (typeof str !== 'string') {
    return ''
  }

  const words = str.split(/[\s-_]+/)
  const result: string[] = []

  for (let i = 0; i < words.length; i++) {
    const word = words[i]
    if (word.length === 0) {
      continue
    }

    if (i === 0) {
      result.push(word.toLowerCase())
    } else {
      result.push(word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    }
  }

  return result.join('')
}

export const maxBy = <T>(
  arr: T[],
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  iteratee: (item: T) => any,
): T | undefined => {
  if (!arr || arr.length === 0) return undefined
  return arr.reduce((acc, item) => {
    const value = iteratee(item)
    if (value > iteratee(acc)) return item
    return acc
  }, arr[0])
}

export const minBy = <T>(
  arr: T[],
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  iteratee: (item: T) => any,
): T | undefined => {
  if (!arr || arr.length === 0) return undefined
  return arr.reduce((acc, item) => {
    const value = iteratee(item)
    if (value < iteratee(acc)) return item
    return acc
  }, arr[0])
}

// groupBy function that takes an array and groups it by a key
export const groupBy = <T>(arr: T[], key: string): Record<string, T[]> => {
  return arr.reduce(
    (acc, item) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const keyValue = (item as Record<string, any>)[key]
      if (!acc[keyValue]) {
        acc[keyValue] = []
      }
      acc[keyValue].push(item)
      return acc
    },
    {} as Record<string, T[]>,
  )
}
