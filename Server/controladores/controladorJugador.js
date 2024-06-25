const {request} = require("express");
const Jugador = require('./../modelos/modeloJugador');

module.exports.todosLosJugadores = (req, res) =>{
    Jugador.find()
    .then((jugadores)=>{
        return res.status(200).json(jugadores);
    })
    .catch((error) =>{
        return res.status(404).json({message: "Algo salió mal", error});
    })
}

module.exports.unJugador = (req,res) =>{
    const id = req.params.id;
    Jugador.findOne({_id: id})
    .then((jugador)=>{
        return res.status(200).json(jugador);
    })
    .catch((error) =>{
        return res.status(404).json({message: "Algo salió mal", error});
    })
}

module.exports.agregarJugador = (req, res) =>{
    const { nombreJugador, posicionPreferida , estado} = req.body;

    // Validar el campo 'nombre'
    if (!nombreJugador) {
        return res.status(400).json({ error: "El nombre del jugador es obligatorio " });
    }

    if(nombreJugador.length < 5) {
        return res.status(400).json({ error: "El nombre del jugador debe tener al menos 5 caracteres. " });
    }
        
    

    Jugador.create(req.body)
    .then((jugador)=>{
        return res.status(201).json(jugador)
    })
    .catch((error)=>{
        return res.status(500).json({message:"Algo salió mal", error});
    })
}

module.exports.borrarJugador = (req, res) =>{
    const id = req.params.id;
    Jugador.deleteOne({_id: id})
    .then((jugadorRemovido) => {
        console.log(jugadorRemovido);
        return res.status(204).end();
    })
    .catch((error) => {
        return res.status(500).json({mensaje: 'Algo salió mal', error})
    });
}

module.exports.actualizarJugador = (req, res) => {
    const id = req.params.id;
    // Extraer el campo 'status' del cuerpo de la solicitud
    const { estado } = req.body;
    
    // Validar que se haya proporcionado el campo 'status'
    if (!estado) {
        return res.status(400).json({ error: "El campo 'status' es requerido para actualizar el jugador." });
    }

    
    // Actualizar solo el campo 'status'
    Jugador.findOneAndUpdate({ _id: id }, { estado: estado }, { new: true })
        .then(jugadorActualizado => {
            if (!jugadorActualizado) {
                return res.status(404).json({ error: "Jugador no encontrado." });
            }
            res.status(200).json(jugadorActualizado);
        })
        .catch(err => res.status(500).json(err));
};