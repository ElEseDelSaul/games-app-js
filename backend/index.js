if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express');
const morgan = require('morgan');
const multer = require('multer');
const path = require('path');
const cors = require('cors');

//Database
require('./database.js')

//Routes
const GamesRoutes = require('./routes/games.routes');

//console.log(process.env.NODE_ENV)

class Server {

    constructor() {
        this.app = express();
        this.Config();
        this.Routes();
        this.Start();
    }

    Config() {
        //Settings
        this.app.set('port', process.env.PORT || 3000);
        //Middlewares
        this.app.use(cors());
        this.app.use(morgan('dev'));
        const storage = multer.diskStorage({
            destination: path.join(__dirname, 'public/uploads'),
            filename(req, file, cb) {
                cb(null, new Date().getTime() + path.extname(file.originalname));   //(error,nombre de archivos y extencion)
            }
        })
        this.app.use(multer({ storage }).single('image')) //input que supervisa multer para la subida de img
        this.app.use(express.urlencoded({ extended: false }))
        this.app.use(express.json())
        //Static Files
        this.app.use(express.static(path.join(__dirname, 'public')))
    }

    Routes() {
        this.app.use('/api/games',GamesRoutes)
    }

    Start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server on port ' + this.app.get('port'));
        })
    }

}

const server = new Server();
module.exports = server.app;
