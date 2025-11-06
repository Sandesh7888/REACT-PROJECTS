import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Book from './components/Books.jsx'

function App() {
  let obj ={
    name: "Sandesh",
    id: 12
  }
 

  return (
    <>
    <Book obj={obj} />

      
    </>
  )

}

export default App
