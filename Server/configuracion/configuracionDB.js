const mongoose = require("mongoose");

mongoose.connect('mongodb://127.0.0.1:27017/admEquipo_db')
.then(()=>{
    console.log("Conexión a la base de datos exitosa")
})
.catch((error)=>{
    console.log(`Error a conectar a la base de datos ${error}`)
});
