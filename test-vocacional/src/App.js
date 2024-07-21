import logo from './logo.svg'
import React, { useState } from 'react'
import './App.css'

import Form from './components/Form'
import Resultados from './components/resultados'

function App() {
  const [resultados, setResultados] = useState(null)
  return resultados ? (
    <Resultados resultados={resultados} />
  ) : (
    <Form setResultados={setResultados} />
  )
}

export default App
