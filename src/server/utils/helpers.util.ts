export function forOwn<T>(
  obj: Record<string, T>,
  iteratee: (value: T, key: string, obj: Record<string, T>) => void,
): void {
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
export function isPlainObject(value: any): boolean {
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

export function snakeCase(str: string): string {
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

export function camelCase(str: string): string {
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
