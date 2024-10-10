import { useEffect, useState } from 'react'
import { useBrowserPreferences } from './useBrowserPreferences'

type LocalStorageOptions<T> = {
  key: string
  value: T
  storage?: 'local' | 'session'
  setValueOnEmpty?: boolean
}

type SetValueArg<T> = T | ((prev: T) => T)

export const useBrowserStorage = <T>(options: LocalStorageOptions<T>) => {
  const storage =
    typeof window === 'undefined'
      ? undefined
      : options.storage === 'session'
        ? sessionStorage
        : localStorage

  const [value, __setValue] = useState<T | undefined>(() => {
    const item = storage?.getItem(options.key)

    if (item === null || item === undefined) {
      if (options.setValueOnEmpty)
        storage?.setItem(options.key, JSON.stringify(options.value))

      return options.value
    }

    try {
      return JSON.parse(item) as T
    } catch {
      return options.value
    }
  })

  const syncStorage = () => {
    const storedValue = storage?.getItem(options.key)

    if (storedValue === null) {
      return
    }

    __setValue(
      typeof storedValue === 'string'
        ? JSON.parse(storedValue)
        : (storedValue as T | undefined),
    )
  }

  const subscribeToStorage = (event: StorageEvent) => {
    if (event.key === options.key) {
      const storageItem = storage?.getItem(options.key)
      if (storageItem === null) {
        return
      }

      __setValue(
        typeof storageItem === 'string'
          ? JSON.parse(storageItem)
          : (storageItem as T | undefined),
      )
    }
  }

  useEffect(() => {
    const abortController = new AbortController()
    syncStorage()
    window.addEventListener('storage', subscribeToStorage, {
      signal: abortController.signal,
    })

    return () => {
      abortController.abort()
    }
  }, [])

  const setValue = (updatedValue: SetValueArg<T>) => {
    __setValue((v) => {
      const newValue =
        updatedValue instanceof Function ? updatedValue(v as T) : updatedValue

      if (newValue === undefined) {
        storage?.removeItem(options.key)
      } else {
        storage?.setItem(options.key, JSON.stringify(newValue))
      }
      return newValue
    })

    // Run on next tick to ensure the value is updated
    setTimeout(() => {
      window.dispatchEvent(
        new StorageEvent('storage', {
          key: options.key,
        }),
      )
    }, 0)
  }

  return [value, setValue] as const
}

export const useThemeStorage = () => {
  const { prefersDark } = useBrowserPreferences()
  return useBrowserStorage<'dark' | 'light'>({
    key: 'saved-theme',
    value: prefersDark ? 'dark' : 'light',
  })
}
