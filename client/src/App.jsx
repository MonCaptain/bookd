import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SidebarWithHeader from './components/SidebarWithHeader'
import LoginPage from './pages/LoginPage'
import Dashboard from './pages/dashboard'

function App() {
  const [count, setCount] = useState(0)

  return (
    
      // <SidebarWithHeader/>
      <Dashboard></Dashboard>
    
  )
}

export default App
