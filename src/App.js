import React, { useState, useEffect } from "react";
import Formulario from "./components/Formulario";
import ListadoImagenes from "./components/ListadoImagenes";
import Error from "./components/Error";
import axios from "axios";
import Spinner from "./components/spinner/Spinner";
import "./components/css/alt.css";

function App() {
  const [search, setSearch] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  // state de error cuando no hay resultados
  const [error, setError] = useState(false);

  // state paginador
  const [actualpage, setAcualPage] = useState(1);
  const [totalpages, setTotalPages] = useState(1);


  useEffect(() => {
    if (search === "") return;

    const request = async () => {
      const imagePagination = 32;
      const key = `17711367-723d7183302a0ee8690114d46`;
      const url = `https://pixabay.com/api/?key=${key}&q=${search}&per_page=${imagePagination}&page=${actualpage}`;
      const response = await axios.get(url);
      const totalHits = response.data.totalHits;

      setLoading(true);

      setTimeout(() => {
        setLoading(false);
        setImages(response.data.hits);
        // calcular total de paginas
        const calcularTotalPages = Math.ceil(totalHits / imagePagination);
        setTotalPages(calcularTotalPages);
      }, 2500);

      // scroll top
      const jumbotron = document.querySelector(".jumbotron");
      jumbotron.scrollIntoView({ behavior: "smooth" }, 800);
  
      if (images.length === 0) {
        return setError(true);
      }
    };
    request();
    // eslint-disable-next-line
  }, [search, actualpage]);

  const previousPage = () => {
    const newActualPage = actualpage - 1;
    if (newActualPage === 0) return;
    setAcualPage(newActualPage);
  };

  const nextPage = () => {
    const newActualPage = actualpage + 1;
    if (newActualPage > totalpages) return;
    setAcualPage(newActualPage);
  };

  // los quite del render, para poder hacer el mensaje de error cuando images.length === 0
  let previous =
    actualpage === 1 || images.length === 0 ? null : (
      <button
        type='button'
        className=' btn btn-success mr-2'
        onClick={previousPage}>
        &laquo; Anterior
      </button>
    );
  let next =
    actualpage === totalpages || images.length === 0 ? null : (
      <button type='button' className='btn btn-success' onClick={nextPage}>
        Siguiente &raquo;
      </button>
    );

  return (
    <div className='container'>
      <div className='jumbotron bg-image'>
        <p className='lead text-center textalt'>PIXABAY FAKE</p>
        <Formulario setSearch={setSearch} />
      </div>

      {loading ? (
        <Spinner />
      ) : (
        <div>
          <ListadoImagenes images={images} />

          <div className='d-flex justify-content-center'>

            {error && images.length === 0 ? (
              <Error mensaje='No hay resultados de tu busqueda' />
            ) : null}
            {previous}
            {next}

          </div>
        </div>
      )}
    </div>
  );
}

export default App;
