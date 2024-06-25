import { useState, useEffect } from "react";
import { Form, Link, useNavigate, useParams } from "react-router-dom";


const Formulario = ({jugadores,funcionAEjecutar, error, setError, errorValidacion, setErrorValidacion}) => {
    const [jugadorAux, setJugadorAux] = useState({nombreJugador:"", posicionPreferida:"No decidido", estado:"No decidido"});
    const navegacion = useNavigate();
    const {id} = useParams();


    const irAHome = () =>{
        setErrorValidacion("");
        setError(""); 
        navegacion(`/`)
    }

    const actualizarJugadoresAux = (jugador, name) =>{
        setErrorValidacion("");
        setError(""); 
        setJugadorAux({...jugadorAux, [name]: jugador})
    }
    
    const procesarFuncion = (event) =>{
        event.preventDefault();
        if(!jugadorAux.nombreJugador ){
            setErrorValidacion("El nombre del jugador es obligatorio");
            return; 
        }
        if(jugadorAux.nombreJugador.length < 3){
            setErrorValidacion("El nombre del jugador tiene que tener mínimo 3 caracteres");
            return;
        }
        console.log(jugadorAux)
        funcionAEjecutar(jugadorAux, id)
        
    }
    
    return(
        <>
        <h1>Autores favoritos</h1>
        <button onClick={(e)=>irAHome()}> Home</button>
        {(errorValidacion)?errorValidacion : ""}
        {(error)?error : ""}
            <form onSubmit={procesarFuncion}>
                <label htmlFor="nombreJugador">
                    Nombre del Jugador
                </label>
                <input value={jugadorAux.nombreJugador} id="nombreJugador" name="nombreJugador" onChange={(e)=> actualizarJugadoresAux(e.target.value, "nombreJugador")} type="text" placeholder="Ejemplo: Paulo Coelho"></input>
                <label htmlFor="posicionPreferida">
                    Posicion Preferida
                </label>
                <input value={jugadorAux.posicionPreferida} id="posicionPreferida" name="posicionPreferida" onChange={(e)=> actualizarJugadoresAux(e.target.value, "posicionPreferida")} type="text" placeholder="Ejemplo: Medio Campo"></input>
                <button type="submit">Enviar</button>
                <button onClick={(e)=>irAHome()} type="button">Cancel</button>
            </form>
        </>
    )
}

export default Formulario;