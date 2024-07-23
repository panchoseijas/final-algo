import React from 'react'
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

const carreras = {
  "Lingüística": ["Periodista", "Escritor", "Editor", "Profesor de Lengua"],
  "Lógica Matemática": ["Matemático", "Ingeniero", "Estadístico", "Científico de Datos"],
  "Espacial": ["Arquitecto", "Diseñador Gráfico", "Ingeniero Civil", "Artista"],
  "Música": ["Músico", "Compositor", "Director de Orquesta", "Profesor de Música"],
  "Interpersonal": ["Psicólogo", "Trabajador Social", "Docente", "Líder de Recursos Humanos"],
  "Kinestésico Corporal": ["Deportista", "Fisioterapeuta", "Bailarín", "Entrenador Personal"],
  "Intrapersonal": ["Psicoterapeuta", "Coach", "Filósofo", "Consultor"],
  "Naturalista": ["Biólogo", "Agrónomo", "Ecologista", "Veterinario"]
}

const Resultados = ({ resultados }) => {
  const data = {
    labels: [
      'Lingüística',
      'Lógica Matemática',
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
  const areaRecomendada = data.labels[porcentajes.indexOf(maxPorcentaje)]
  return (
    data && (
      <div>
        <h3>Te recomendamos: {areaRecomendada}</h3>
        <h4>Carreras recomendadas:</h4>
        <ul>
          {carreras[areaRecomendada].map((carrera, index) => (
            <li key={index}>{carrera}</li>
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
