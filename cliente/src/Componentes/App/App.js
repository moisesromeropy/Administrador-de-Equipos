import { useEffect, useState } from "react";
import axios from 'axios';
import { Routes, Route, Link, useNavigate} from "react-router-dom";
import Jugadores from "../Jugadores/Jugadores";
import Formulario from "../Formulario/Formulario";
import "./App.css"
import JugadoresEstado from "../Jugadores/JugadoresEstado";

function App() {
  const [jugadores, setJugadores] = useState([]);
  const URL_BASE = "http://localhost:8000/api/"
  const [error, setError] = useState("");
  const [errorValidacion, setErrorValidacion] = useState("");
  const navegacion = useNavigate();
  useEffect(()=>{
      const cargarJugadores =()=>{
          axios.get(`${URL_BASE}jugadores`)
          .then((response)=>{
              console.log(response.data)
              setJugadores(response.data);
          })
          .catch((error)=>{
              console.log(error);
              setError(error)
          })
      }
      cargarJugadores();
  }, [])

  const agregarAlEstado = (jugador)=>{
      setJugadores([...jugadores, jugador]);
  }

  const agregarJugador = (nuevoJugador, id) =>{
      axios.post(`http://localhost:8000/api/jugadores/agregar`,
          nuevoJugador,
          {
              headers:{
                  'Content-Type':'application/json'
              }
          }
      )
      .then((response)=>{
          console.log(response)
          agregarAlEstado(response.data);
          setError("");
          setErrorValidacion("");
          navegacion("/");
      })
      .catch((errr)=>{
          console.log(errr);
          setError(errr)

      })
  }
  
  const editarEstado = (jugadorActualizado) =>{
      const indice = jugadores.findIndex((jugador)=>jugador._id===jugadorActualizado._id);
      console.log(indice)
      const jugadoresActualizados = [...jugadores];
      jugadoresActualizados[indice].estado= jugadorActualizado.estado;
      setJugadores(jugadoresActualizados);
  }

  const editarJugador = (estado, id ) =>{
      axios.put(`${URL_BASE}jugadores/editar/${id}`,
         {estado},
          {
              headers:{
                    'Content-Type':'application/json'
              }
          }
      )
      .then((response)=>{
          editarEstado(response.data);
          console.log(response)
          setError("");
          setErrorValidacion("");
      })
      .catch((errr)=>{
          console.log(errr.response.data.message);
          setError(errr);
      })
  }
  
  const eliminarDelEstado = (id) =>{
      const indice = jugadores.findIndex((jugador)=>jugador._id === id);
      const jugadoresActualizados=[...jugadores];
      jugadoresActualizados.splice(indice, 1);
      setJugadores(jugadoresActualizados);
  }

  const eliminarJugador = (id) =>{
      axios.delete(`${URL_BASE}jugadores/borrar/${id}`)
      .then((response)=>{
          eliminarDelEstado(id);
          setError("");
      })
      .catch((errr)=>{
          setError(errr);
      })
  }
  

  return (
    <div className="App">
         <Routes>
                <Route path="/" element={<Jugadores jugadores={jugadores} setError={setError} eliminarJugador={eliminarJugador}/>} />
                <Route path="/jugadores/nuevo" element={<Formulario jugadores={jugadores} setErrorValidacion={setErrorValidacion} errorValidacion={errorValidacion} error={error} setError={setError} funcionAEjecutar={agregarJugador}/>}/>
                <Route path="/estado/juego" element={<JugadoresEstado jugadores={jugadores} setError={setError} editarJugador={editarJugador}/>}/>
            </Routes>
    
    </div>
  );
}

export default App;
