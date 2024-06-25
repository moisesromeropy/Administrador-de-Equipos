import {Link, useNavigate} from "react-router-dom" 
import { Button, Table, Badge } from 'reactstrap';
const Jugadores = (props)=>{
    const {jugadores, setError, eliminarJugador} = props;
    const navegacion = useNavigate();

    const borrarJugador = (id) =>{
        eliminarJugador(id);
    }


    return (
        <>  
        <h1>Jugadores</h1>
        <div style={{display: "flex", gap:"30px", justifyContent:"center"}}>
        <Badge style={{height: "30px",width:"120px" , display:"flex", alignItems:"center"}} color="primary">
            <Link to="/jugadores/nuevo" style={{color:"white"}}>Agregar Jugador</Link>
        </Badge>
        <Badge style={{height: "30px",width:"120px" , display:"flex", alignItems:"center"}} color="primary">
            <Link to="/estado/juego" style={{color:"white"}}>Manejar Jugador</Link>
        </Badge>
        </div>
        <Table className="table-light">
            <thead>
                <tr>
                    <th>
                       Jugador
                    </th>
                    <th>
                        Posición
                    </th>
                    <th>
                        Acciones
                    </th>
                </tr>
            </thead>
            <tbody>
                {jugadores.map((jugador)=>(
                <tr key={jugador._id}>
                    <td >{jugador.nombreJugador}</td>
                    <td>{jugador.posicionPreferida}</td>
                    <td>  
                    <Button color="danger" onClick={(e)=>borrarJugador(jugador._id)}>Eliminar</Button>
                    </td>  
                </tr>
                    ))} 
            </tbody>
        </Table>
        </>
    )
}

export default Jugadores;