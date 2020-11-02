import React, { useState } from "react";
import Error from "./Error";
import PropTypes from 'prop-types'

const Formulario = ({setSearch}) => {
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);

  const handleonSubmit = (e) => {
    e.preventDefault();
    if (value.trim() === "") {
      setError(true);
      return;
    }
    setError(false);
    // send to appjs
    setSearch(value);
  };

  return (
    <form onSubmit={handleonSubmit}>
      <div className='row'>
        <div className='form-group col-md-8'>
          <input
            type='text'
            className='form-control form-control-lg'
            placeholder='Busca una imagen, ejemplo: "Perrito:)"'
            onChange={(e) => setValue(e.target.value)}
          />
        </div>

        <div className='form-group col-md-4'>
          <input
            type='submit'
            className='btn btn-lg btn-success btn-block'
            value='Buscar'
          />
        </div>
      </div>

      {error ? <Error mensaje='Debes agregar cualquier cosa al campo:)' /> : null}
    </form>
  );
};

Formulario.propTypes = {
  setSearch:PropTypes.func.isRequired
}

export default Formulario;
