const Environment = {
  API_BASE_URL: process.env.REACT_APP_PUBLIC_URL,
  KMZ_URL: process.env.REACT_APP_KMZ_URL,
  CESIUM_TOKEN: process.env.REACT_APP_CESIUM_ION_TOKEN,
  AIR_INTERVAL: Number(process.env.REACT_APP_AIR_INTERVAL),
  VESSEL_INTERVAL: Number(process.env.REACT_APP_VESSEL_INTERVAL),
  LOGISTIC_INTERVAL: Number(process.env.REACT_APP_LOGISTIC_INTERVAL),
  ALERT_SOCKET: process.env.REACT_APP_SOCKET,
  TARGET_SOCKET: process.env.REACT_APP_SOCKET,
}
export default Environment
