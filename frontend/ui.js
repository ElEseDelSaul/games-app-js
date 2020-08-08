import GameService from './services/GameService'
import { format } from 'timeago.js'
//Instancia de la clase - SERVICIO
const gameService = new GameService();


class UI {  //Interactua con el DOM del navegador

    async renderGames() {
        //Cambiar encabezados
        let headerForm = document.getElementById('headerStatusEdit')
        let btnStatusEdit = document.getElementById('btnStatusEdit')
        //Cambiar encabezado y btn del form
        headerForm.textContent = 'Add New Game';
        btnStatusEdit.textContent = 'Save Game';
        const games = await gameService.getGames();
        //console.table(games
        const gamesCardContainer = document.getElementById('games-cards');
        gamesCardContainer.innerHTML = '' //Limpiar el contenedor de los juegos
        games.forEach((game) => {
            const div = document.createElement('div');
            div.className = 'mb-2'; //Estilos
            div.innerHTML = `
                <div class="card bg-dark">
                    <div class="row">
                        <div class="col-md-4">
                            <img src='${game.imagePath}' class="img-fluid">
                        </div>
                        <div class="col-md-8">
                            <div class="card-block px-2 text-center my-2">
                                <h4 class="card-title">${game.title}</h4>
                                <p class="card-text">${game.author}</p>
                                <p class="card-text">${game.description}</p>
                                <p class="card-text">${game.category}</p>
                                <a class="btn btn-danger delete" _id="${game._id}">DELETE</a>
                                <a class="btn btn-info edit" _id="${game._id}">EDIT</a>
                            </div>
                        </div>
                    </div>
                    <div class="card-footer p-2">
                        ${format(game.createdAt)}
                    </div>
                </div>
            `;
            gamesCardContainer.appendChild(div);
        });
    }

    async addNewGame(newGame) {
        await gameService.pushGame(newGame);
        this.clearGameForm();
        this.renderGames();
    }

    clearGameForm() {
        document.getElementById('game-form').reset();
        const buttons = document.getElementById('buttons');
        while(buttons.firstChild){  //Remover todos los child de buttons
            buttons.removeChild(buttons.firstChild)
        }
    }

    renderMessage(message, colorMessage, secondsToRemove) {
        const div = document.createElement('div');       //Crear Div
        div.className = `alert alert-${colorMessage} message`; //Agregar CLASES
        div.appendChild(document.createTextNode(message));  //crear un elemento de texto como hijo


        const container = document.querySelector('.col-md-4');   //Seleccionar elemento que tiene como CLASE
        const form = document.querySelector('#game-form');  //Seleccionar elemento que tiene como Id

        container.insertBefore(div, form) //Anter del form mostrar el message
        setTimeout(() => {
            document.querySelector('.message').remove()  //Seleccionar elemento con clase message
        }, secondsToRemove)
    }

    async deleteGame(idGame) {
        await gameService.deleteGame(idGame);
        this.clearGameForm();
        this.renderGames();
    }

    async getOneGame(idGame) {
        const res = await gameService.getGame(idGame)
        return res;
    }

    async updateGame(idGame, newGame) {
        await gameService.updateGame(idGame, newGame);
        this.renderGames();
        this.clearGameForm();
    }

}

export default UI