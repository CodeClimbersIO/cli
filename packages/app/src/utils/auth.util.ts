// function to get api key from local storage
const LOCAL_API_KEY = 'local_api_key'
function getLocalApiKey() {
  return localStorage.getItem(LOCAL_API_KEY)
}

function setLocalApiKey(apiKey: string) {
  localStorage.setItem(LOCAL_API_KEY, apiKey)
}

export default { getLocalApiKey, setLocalApiKey }
