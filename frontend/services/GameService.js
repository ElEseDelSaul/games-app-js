class GameService {

    constructor() {
        this.API = '/api/games'
    }

    async getGames() {
        const response = await fetch(this.API) //Hacer peticion GET a la API del BACKEND
        const games = await response.json()
        return games
    }

    async pushGame(game) {
        const response = await fetch(this.API, { //Hacer peticion POST a la API
            method: 'POST',
            body: game
        })
        const data = await response.json()
        console.log(data)
    }

    async deleteGame(idGame) {
        const res = await fetch(`${this.API}/${idGame}`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'DELETE'
        })
        const data = await res.json()
        console.log(data)
    }

    async getGame(idGame){
        const res = await fetch(`${this.API}/${idGame}`)
        const game = res.json()
        return game
    }
    
    async updateGame(idGame, newGame) {
        const res = await fetch(`${this.API}/${idGame}`, {
            method: 'PUT',
            body: newGame
        })
        const data = await res.json()
        console.log(data)
    }

}

export default GameService
//module.exports = GameService