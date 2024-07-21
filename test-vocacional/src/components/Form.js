import React, { useState } from 'react';
import areas from '../preguntas.js';
import Estrellas from './estrellas.js';



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
  const response = await fetch('http://127.0.0.1:8001/resultado', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(respuestas),
  });
  return response.json();

}




function Form() {


  const [etapasCompletadas, setCompletadStages] = useState(0);
  const [respuestas, setRespuestas] = useState([]);
  const nombresAreas = Object.keys(areas);
  const [areaActual, setAreaActual] = useState(nombresAreas[etapasCompletadas]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (etapasCompletadas === nombresAreas.length - 1) {

      console.log(Object.values(respuestas).flat());
      return;
    }
    setCompletadStages(etapasCompletadas + 1);
    setAreaActual(nombresAreas[etapasCompletadas + 1]);

  }

  const handleChange = (name, index, value) => {
    setRespuestas((prevRespuestas) => {
      const updatedRespuestas = { ...prevRespuestas };
      if (!updatedRespuestas[name]) {
        updatedRespuestas[name] = [];
      }
      updatedRespuestas[name][index] = value;
      return updatedRespuestas;
    });
  };

  return (
    <>

      <form>
        {etapasCompletadas < nombresAreas.length - 1 ? (
          <>
            <h1>{areaActual.toLocaleUpperCase()}</h1>
            {areas[areaActual].preguntas.map((pregunta, index) => (
              <div key={areaActual + index}>
                <p>{pregunta}</p>
                <Estrellas groupName={areaActual} questionIndex={index} onChange={handleChange} />
              </div>
            ))}
            <button onClick={handleSubmit}>Submit</button>
          </>
        ) : (
          <h1>Terminaste</h1>
        )}
      </form>
    </>
  );
}

export default Form;