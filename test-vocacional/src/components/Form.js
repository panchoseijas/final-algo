import React, { useState } from 'react'
import areas from '../preguntas.js'
import Estrellas from './estrellas.js'
import Button from '@mui/material/Button';


async function postResults(respuestas) {
  const response = await fetch('http://localhost:8000/resultado', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(respuestas),
  })
  return response.json()
}

function Preguntas({ areas, setResultados }) {

  const [etapasCompletadas, setCompletadStages] = useState(0)
  const [respuestas, setRespuestas] = useState([])
  const nombresAreas = Object.keys(areas)
  const [areaActual, setAreaActual] = useState(nombresAreas[etapasCompletadas])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (etapasCompletadas === nombresAreas.length - 1) {
      // const resultados = await postResults(
      //   Object.values(respuestas)
      //     .flat())
      // )

      const resultados = {
        linguistica: 10,
        logica_matematica: 5,
        espacial: 15,
        musica: 20,
        interpersonal: 5,
        kinestesico_corporal: 20,
        intrapersonal: 13,
        naturalista: 12,

      }
      setResultados(resultados)

      return
    }
    setCompletadStages(etapasCompletadas + 1)
    setAreaActual(nombresAreas[etapasCompletadas + 1])
  }

  const handleChange = (name, index, value) => {
    setRespuestas((prevRespuestas) => {
      const updatedRespuestas = { ...prevRespuestas }
      if (!updatedRespuestas[name]) {
        updatedRespuestas[name] = []
      }
      updatedRespuestas[name][index] = Number(value)
      return updatedRespuestas
    })
  }


  return (
    <div className='container-pregunta'>
      <h1>{areaActual.toLocaleUpperCase().replace('_', ' ')}</h1>
      {areas[areaActual].preguntas.map((pregunta, index) => (
        <div key={areaActual + index} className='pregunta'>
          <p>{pregunta}</p>
          <Estrellas
            groupName={areaActual}
            questionIndex={index}
            onChange={handleChange}
          />
        </div>
      ))}
      <Button variant='contained' onClick={handleSubmit}>Submit</Button>
    </div>
  )
}


function Form({ setResultados }) {
  const [started, setStarted] = useState(false)

  return (
    <>
      <form className=''>
        {started ? (
          <Preguntas areas={areas} setResultados={setResultados} />) : (
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
