import React from 'react'
import ReactDOM from 'react-dom/client'
import '../node_modules/cesium/Build/Cesium/Widgets/widgets.css'
import App from './App'
import './index.css'
import { store } from './store'
import { Provider } from 'react-redux'
import 'primereact/resources/themes/lara-light-indigo/theme.css' //theme
import 'primereact/resources/primereact.min.css' //core css
import 'primeicons/primeicons.css'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Ion } from 'cesium'
import Environment from './shared/constants/AppConstants'
import '@fontsource/roboto-condensed'
Ion.defaultAccessToken = Environment.CESIUM_TOKEN
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <Provider store={store}>
    <App />
    <ToastContainer />
  </Provider>
)
