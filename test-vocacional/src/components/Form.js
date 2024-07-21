import React, { useState } from 'react'
import areas from '../preguntas.js'
import Estrellas from './estrellas.js'

async function postResults(respuestas) {
  //   postResults([
  //     10, 10, 10, 10,
  //     10, 10, 10, 10,
  //     10, 10, 10, 10,
  //     10, 10, 10, 10,
  //     10, 10, 10, 10,
  //     10, 10, 10, 10,
  //     10, 10, 10, 10,
  //     10, 10, 10, 10
  // ]).then(data => {
  //     console.log(data);
  // });
  // console.log('hola')
  const response = await fetch('http://localhost:8000/resultado', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(respuestas),
  })
  return response.json()
}

function Form({ setResultados }) {
  const [etapasCompletadas, setCompletadStages] = useState(0)
  const [respuestas, setRespuestas] = useState([])
  const nombresAreas = Object.keys(areas)
  const [areaActual, setAreaActual] = useState(nombresAreas[etapasCompletadas])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (etapasCompletadas === nombresAreas.length - 1) {
      const resultados = await postResults(
        Object.values(respuestas)
          .flat()
          .map((numero) => Number(numero))
      )
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
      updatedRespuestas[name][index] = value
      return updatedRespuestas
    })
  }
  console.log(etapasCompletadas)
  console.log(nombresAreas)
  return (
    <>
      <form className=''>
        {etapasCompletadas < nombresAreas.length ? (
          <>
            <h1>{areaActual.toLocaleUpperCase()}</h1>
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
            <button onClick={handleSubmit}>Submit</button>
          </>
        ) : (
          <h1>{JSON.stringify(respuestas)}</h1>
        )}
      </form>
    </>
  )
}

export default Form
