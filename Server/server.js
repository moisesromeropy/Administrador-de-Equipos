const express = require('express');
const app = express();
const cors = require("cors");
const rutaJugador = require('./rutas/rutasJugador');
require('./configuracion/configuracionDB');

app.use(cors({
    origin: "http://localhost:3000"
}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

rutaJugador(app);


app.listen(8000, () => {
    console.log("Listening at Port 8000")
});