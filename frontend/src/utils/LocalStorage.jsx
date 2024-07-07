export const token_key = 'WEATHER_FORECAST_TOKEN'
export const API_BASE_URL= "https://weather-forecast-api-ronak.vercel.app/"

export const setToken = (token) => {
  window.localStorage.setItem(token_key, token);
}

export const getToken = () => {
  let token = window.localStorage.getItem(token_key)
  if (token != false) return token
  return false
}

export const isLogin = () => {
  const token = getToken();
  console.log(token);

  if (token != null) {
    return true
  }
  return false
}

export const logout = () => {
  window.localStorage.clear()
}
