import {Link, useNavigate} from "react-router-dom" 
import { Button, Table, Badge } from 'reactstrap';
const JugadoresEstado = (props)=>{
    const {jugadores, setError, editarJugador} = props;
    const navegacion = useNavigate();

    const editarEstado = (estado, id) =>{
        editarJugador(estado, id);
    }


    return (
        <>  
        <h1>Jugadores</h1>
        <Badge style={{height: "30px",width:"95px" , display:"flex", alignItems:"center"}} color="primary">
            <Link to="/" style={{color:"white"}}>Jugador</Link>
        </Badge>
        <Table className="table-light">
            <thead>
                <tr>
                    <th>
                       Jugador
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
                    <td>  
                    <Button color={jugador.estado==="Jugando"?"success":""} onClick={(e)=>editarEstado("Jugando",jugador._id)}>Jugando</Button>
                    <Button color={jugador.estado==="No jugando"?"warning":""} onClick={(e)=>editarEstado("No jugando",jugador._id)}>No jugando</Button>
                    <Button color={jugador.estado==="No decidido"?"danger":""} onClick={(e)=>editarEstado("No decidido",jugador._id)}>No decidido</Button>
                    </td>  
                </tr>
                    ))} 
            </tbody>
        </Table>
        </>
    )
}

export default JugadoresEstado;