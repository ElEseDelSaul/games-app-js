const { Router } = require('express');

//Controller
const {
    showGames,
    saveGame,
    deleteGame,
    getOneGame,
    updateGame
} = require('../controllers/games.controllers')

class gamesRoutes {

    constructor() {
        this.router = Router();
        this.Routes();
    }

    Routes() {
        this.router.get('/', showGames)     //Get All
        this.router.get('/:id', getOneGame) //Get One
        this.router.post('/', saveGame) //Save 
        this.router.delete('/:id', deleteGame)  //Remove
        this.router.put('/:id', updateGame) //Update
    }

}

const GamesRoutes = new gamesRoutes();
module.exports = GamesRoutes.router;