const express = require('express');
const { response , request } = require('express');
const bodyParser = require("body-parser");

const listaJugadores = require("./data/jugadores");

const PORT = 3000;

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const models = require("./models/index");
const routes = require("./routes/index");

app.get('/api/jugadores', (req = request, res = response) => {
    try{

        return res.status(200).json({
            listaJugadores,
            success: true
        });

    }catch(err){
        return res.status(500).json({
            message: 'Hable con el administrador',
            success: false
        });
    }
});

app.put('/api/jugadores/:id', (req = request, res = response) => {
    try{
        const id = parseInt(req.params.id);
        const jugadorParaActualizar = req.body;
        
        const jugadorEditado = listaJugadores.find(jugador => jugador.id === id);
        
        if(!jugadorEditado){
            return res.status(404).json({ error: 'Jugador no encontrado por ese id' })
        }

        jugadorEditado.nombre = jugadorParaActualizar.nombre;
        jugadorEditado.posicion = jugadorParaActualizar.posicion;
        
        res.json({ message: 'Jugador actualizado correctamente', jugador: jugadorEditado });
        

    }catch(err){
        return res.status(500).json({
            message: 'Hable con el administrador',
            success: false
        });
    }
});

app.listen(PORT, ()=> {
    console.log(`La api jugadores se esta ejeutando en : http:localhost:${PORT}`);
});