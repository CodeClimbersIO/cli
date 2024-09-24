// function to get api key from local storage
const LOCAL_API_KEY = 'local_api_key'
function getLocalApiKey() {
  const apiKey = localStorage.getItem(LOCAL_API_KEY)
  if (apiKey === 'undefined') {
    return null
  }
  return apiKey
}

function setLocalApiKey(apiKey: string) {
  if (apiKey === 'undefined') return
  localStorage.setItem(LOCAL_API_KEY, apiKey)
}

export default { getLocalApiKey, setLocalApiKey }
