import React, { useState } from 'react'
import Estrellas from './estrellas.js'
import Button from '@mui/material/Button';



function Preguntas({ areas, setResultados }) {

    const [etapasCompletadas, setCompletadStages] = useState(0)
    const [respuestas, setRespuestas] = useState([])
    const nombresAreas = Object.keys(areas)
    const [areaActual, setAreaActual] = useState(nombresAreas[etapasCompletadas])


    async function postResults(respuestas) {
        const temp = [
            3, 4, 3, 6,
            7, 4, 7, 5,
            9, 5, 4, 4,
            10, 4, 1, 1,
            10, 10, 10, 10,
            1, 2, 2, 3,
            1, 1, 2, 3,
            1, 2, 1, 1
        ]
        const response = await fetch('http://localhost:8000/resultado', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(respuestas),
        })
        return response.json()
    }


    const handleSubmit = async (e) => {
        e.preventDefault()
        if (etapasCompletadas === nombresAreas.length - 1) {
            const resultados = await postResults(
                Object.values(respuestas)
                    .flat())
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
        <div className='container-pregunta fadeIn'>
            <h1>{areaActual.toLocaleUpperCase().replace('_', ' ')}</h1>
            {areas[areaActual].map((pregunta, index) => (
                <div key={areaActual + index} className='pregunta fadeIn'>
                    <p>{pregunta}</p>
                    <Estrellas
                        groupName={areaActual}
                        questionIndex={index}
                        onChange={handleChange}
                    />
                </div>
            ))}
            <Button variant='contained' onClick={handleSubmit}>Siguiente</Button>
        </div>
    )
}

export default Preguntas