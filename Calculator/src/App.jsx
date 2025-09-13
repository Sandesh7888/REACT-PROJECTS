import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ThemeToggle from './components/ThemeToggle'
import Calculation from './components/Calculation'
import Counter from './components/Counter'
function App() {
  const [theme, setTheme] = useState("light");

  return (
    <div className={`app ${theme}`}>
      <ThemeToggle theme={theme} setTheme={setTheme} />
      <Calculation />
      <Counter/>
    </div>
  );
}



export default App
