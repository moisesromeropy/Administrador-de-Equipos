const mongoose = require("mongoose");

const ColeccionJugador = mongoose.Schema({
    nombreJugador: {
        type: String,
        required: [true, "El nombre del jugador es requerido"],
        minlength: [5, "El nombre del jugador tiene que tener mínimo 5 caracteres"]
    },
    posicionPreferida : {
        type: String,
        default: "No decidido"
    },
    estado: {
        type: String,
        enum:["Jugando", "No jugando", "No decidido"],
        default: "No decidido"
    }
})

const Jugador = mongoose.model("Jugador", ColeccionJugador);

module.exports = Jugador;