import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import '@fontsource/inter'
import MainRoutes from './routes/Routes'

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <MainRoutes />
    </BrowserRouter>
  )
}

export default App
