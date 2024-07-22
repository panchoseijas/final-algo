import logo from './logo.svg'
import React, { useState } from 'react'
import './App.css'

import Form from './components/Form'
import Resultados from './components/resultados'



function App() {
  const [resultados, setResultados] = useState(null)
  return (
    <div className='container'>
      <header className='header'>
        <h1>Test Vocacional</h1>
      </header>
      {resultados ? (
        <Resultados resultados={resultados} />
      ) : (
        <Form setResultados={setResultados} />
      )}

    </div>
  )
}

export default App
