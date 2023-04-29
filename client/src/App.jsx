import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SidebarWithHeader from './components/SidebarWithHeader'

function App() {
  const [count, setCount] = useState(0)

  return (
    
      <SidebarWithHeader/>
    
  )
}

export default App
