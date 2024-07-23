import React, { useState } from 'react'
import Estrellas from './estrellas.js'
import Button from '@mui/material/Button';
import { useEffect } from 'react';
import Preguntas from './preguntas.js'


function Form({ setResultados }) {
  const [started, setStarted] = useState(false)
  const [data, setData] = useState(null)


  async function fetchData() {
    const response = await fetch('http://localhost:8000/preguntas', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    const json = await response.json();
    setData(json)
  }



  useEffect(() => {
    fetchData()
  }, [])

  return (
    <>
      <form className=''>
        {started ? (
          <Preguntas areas={data} setResultados={setResultados} />) : (
          <div className=''>
            <h2>Este test te ayudará a descubrir tus habilidades y preferencias</h2>
            <Button className='button' variant='contained' onClick={() => setStarted(true)} size='large'>
              Empezar
            </Button>
          </div>

        )}
      </form >
    </>
  )
}

export default Form
