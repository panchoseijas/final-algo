import React, { useState, useEffect } from 'react'
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import Button from '@mui/material/Button';

// Registrar los componentes de Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)


const Resultados = ({ resultados }) => {
  const data = {
    labels: [
      'Lingüística',
      'Logica Matematica',
      'Espacial',
      'Música',
      'Interpersonal',
      'Kinestésico Corporal',
      'Intrapersonal',
      'Naturalista',
    ],
    datasets: [
      {
        label: 'Porcentaje',
        data: [
          resultados.linguistica,
          resultados.logica_matematica,
          resultados.espacial,
          resultados.musica,
          resultados.interpersonal,
          resultados.kinestesico_corporal,
          resultados.intrapersonal,
          resultados.naturalista,
        ],
        backgroundColor: [
          'rgba(102, 204, 204, 0.6)', // Lingüística - Celeste medio verdoso
          'rgba(54, 162, 235, 0.6)', // Lógica Matemática - Azul
          'rgba(255, 99, 132, 0.6)', // Espacial - Rojo
          'rgba(255, 159, 64, 0.6)', // Música - Naranja
          'rgba(255, 206, 86, 0.6)', // Interpersonal - Amarillo
          'rgba(255, 105, 180, 0.6)', // Kinestésico Corporal - Rosa
          'rgba(153, 102, 255, 0.6)', // Intrapersonal - Violeta
          'rgba(75, 192, 75, 0.6)', // Naturalista - Verde
        ],
        borderColor: [
          'rgba(102, 204, 204, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(255, 105, 180, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(75, 192, 75, 1)',
        ],
        borderWidth: 1,
      },
    ],
  }

  function format(str) {
    return (str.charAt(0).toUpperCase() + str.slice(1)).replace(/_/g, ' ')
  }

  function normalize(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/ /g, '_').toLowerCase();
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Resultados del Test Vocacional',
      },
    },
  }

  const porcentajes = data.datasets[0].data
  const maxPorcentaje = Math.max(...porcentajes)
  const areaRecomendada = data.labels[porcentajes.indexOf(maxPorcentaje)].toLocaleLowerCase().replace('_', ' ')
  const [carreras, setCarreras] = useState({})

  console.log(resultados)
  console.log(areaRecomendada)
  console.log(normalize(areaRecomendada))
  console.log(carreras[areaRecomendada.toLocaleLowerCase().replace(' ', '_')])



  async function postArea(area) {
    const response = await fetch('http://localhost:8000/carreras', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(area)
    })

    const carreras = await response.json()
    console.log(carreras)
    setCarreras(carreras)
  }

  useEffect(() => {
    postArea(normalize(areaRecomendada))
  }, [])

  console.log('Carreras', carreras)
  return (
    data && (
      <div>
        <h3>Area recomendada: {format(areaRecomendada)}</h3>
        <h4>Carreras recomendadas:</h4>
        <ul>
          {carreras[normalize(areaRecomendada)] && carreras[normalize(areaRecomendada)].map((carrera, index) => (
            <li key={index}>{format(carrera)}</li>
          ))}
        </ul>
        <Bar data={data} options={options} />
        <Button className='button' variant='contained' onClick={() => window.location.reload(true)} size='large'>
          Volver a Empezar
        </Button>
      </div>
    )
  )
}



export default Resultados
