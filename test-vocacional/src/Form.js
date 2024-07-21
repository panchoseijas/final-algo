import React, { useState } from 'react';
import areas from './preguntas';

function Estrellas({ groupName , questionIndex, respuestas, onChange }) {
    const [selectedValue, setSelectedValue] = React.useState(0);
  
    const handleChange = (event) => {
      setSelectedValue(event.target.value);
      respuestas.push(event.target.value);
    };
  
    // const handleChange = (event) => {
    //   setSelectedValue(event.target.value);
    //   onChange(groupName,questionIndex, event.target.value);
    // };

    return (
      <div className='calificacion'>
        {[...Array(10)].map((_, index) => {
          const value = 10 - index;
          return (
            <React.Fragment key={value}>
              <input
                id={`radio${groupName+questionIndex}${value}`}
                type="radio"
                name={groupName+questionIndex}
                value={value}
                checked={selectedValue === value.toString()}
                onChange={handleChange}
              />
              <label
                htmlFor={`radio${groupName+questionIndex}${value}`}
                className={selectedValue >= value ? 'yellow' : 'black'}
              >
                ★
              </label>
            </React.Fragment>
          );
        })}
        <p>{selectedValue}</p>
      </div>
    );
  }
  
  
  function Form() {
  

    const [etapasCompletadas, setCompletadStages] = useState(0);
    const [respuestas, setRespuestas] = useState([]);
    const nombresAreas = Object.keys(areas);    
    const [areaActual, setAreaActual] = useState(nombresAreas[etapasCompletadas]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (etapasCompletadas === nombresAreas.length - 1) {

            //
            console.log(respuestas);
            return;
        }
        setCompletadStages(etapasCompletadas + 1);
        setAreaActual(nombresAreas[etapasCompletadas + 1]);

    }

    const handleChange = (name,index, value) => {
        setRespuestas({
            ...respuestas,
            [name]: value
        });
    }


    return (<>
     <h1>{areaActual}</h1>
      <form >
        {areas[areaActual].preguntas.map((pregunta, index) => (
          <div key={index}>
            
            <p>{pregunta}</p>
            <Estrellas groupName={areaActual} questionIndex={index} respuestas={respuestas} onChange={handleChange} />
          </div>
          
        ))}
        <button onClick={handleSubmit}>Submit</button>
      </form>
    </>
       
    );
  }

  export default Form;