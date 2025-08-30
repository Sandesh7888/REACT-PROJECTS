import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ThemeToggle from './components/ThemeToggle'
import Calculation from './components/Calculation'

function App() {
  const [theme, setTheme] = useState("light");

  return (
    <div className={`app ${theme}`}>
      <ThemeToggle theme={theme} setTheme={setTheme} />
      <Calculation />
    </div>
  );
}



export default App
