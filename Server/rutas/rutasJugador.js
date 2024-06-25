const controladorJugador = require("./../controladores/controladorJugador");

module.exports = (app) =>{
    app.get('/api/jugadores', controladorJugador.todosLosJugadores);
    app.get('/api/jugadores/:id', controladorJugador.unJugador);
    app.post('/api/jugadores/agregar', controladorJugador.agregarJugador);
    app.put('/api/jugadores/editar/:id', controladorJugador.actualizarJugador);
    app.delete('/api/jugadores/borrar/:id', controladorJugador.borrarJugador);
}