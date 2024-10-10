// function to get api key from local storage
const LOCAL_API_KEY = 'local_api_key'
const getLocalApiKey = (): string | null => {
  const apiKey = localStorage.getItem(LOCAL_API_KEY)
  if (apiKey === 'undefined') {
    return null
  }
  return apiKey
}

const setLocalApiKey = (apiKey: string) => {
  if (apiKey === 'undefined') return
  localStorage.setItem(LOCAL_API_KEY, apiKey)
}

export { getLocalApiKey, setLocalApiKey }
