//require('./styles/app.css')
import './styles/app.css';
import UI from './ui';

let statusEdit = false;

//CAPTURAR EVENTOS DEL DOM

//Cargar datos apenas cargue la aplicacion
document.addEventListener('DOMContentLoaded', () => {
    const ui = new UI();
    ui.renderGames();
});

//Edit
document.getElementById('games-cards').addEventListener('click', e => {
    if (e.target.classList.contains('edit')) {
        statusEdit = true;
        window.scroll({
            top:80
        })
        // CARGAR DATA EN FORMULARIO DE GAME TO EDIT        
        //Capturar elementos del DOM
        let headerForm = document.getElementById('headerStatusEdit');
        let btnStatusEdit = document.getElementById('btnStatusEdit');
        let idToEdit = document.getElementById('idToEdit');
        const idGame = e.target.getAttribute('_id');
        const title = document.getElementById('title');
        const description = document.getElementById('description');
        const author = document.getElementById('author');
        const category = document.getElementById('category');
        const imagePath = document.getElementById('image');
        const buttons = document.getElementById('buttons');
        const btnBack = document.createElement('button');

        //Cambiar encabezado y btn del form
        headerForm.textContent = 'Edit Game';
        btnStatusEdit.textContent = 'Update Game';
        btnBack.className = 'btn btn-block btn-danger';
        btnBack.id = 'btnBack'
        btnBack.textContent = 'Back';

        if (!buttons.firstChild) {  //No permitir mas de un btnBack en el form
            //Agregar boton back
            buttons.appendChild(btnBack)
        }

        btnBack.addEventListener('click', (e) => {  //Cancelar update
            statusEdit = false
            ui.clearGameForm()
            //Regresar header y button al estado original
            let headerForm = document.getElementById('headerStatusEdit')
            let btnStatusEdit = document.getElementById('btnStatusEdit')
            //Cambiar encabezado y btn del form
            headerForm.textContent = 'Add New Game';
            btnStatusEdit.textContent = 'Save Game';
        })

        //OBTENER DATA DE JUEGO A EDITAR
        const ui = new UI();
        ui.getOneGame(idGame).then(res => {
            //Vaciar data en formulario 
            idToEdit.value = idGame
            title.value = res.title;
            description.value = res.description;
            author.value = res.author;
            category.value = res.category;
            imagePath.file = res.imagePath;
        })
    }
}
)

//Agregar & Actualizar
document.getElementById('game-form').addEventListener('submit', e => {
    e.preventDefault();
    const ui = new UI();

    //Capturar Data
    let idGameToEdit = document.getElementById('idToEdit').value
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const author = document.getElementById('author').value;
    const category = document.getElementById('category').value;
    const image = document.getElementById('image').files;
    
    if (statusEdit === true) {  //ACTUALIZAR
        let gameToEdit = new FormData()
        gameToEdit.append('image', image[0]);
        gameToEdit.append('title', title);
        gameToEdit.append('description', description);
        gameToEdit.append('category', category);
        gameToEdit.append('author', author);
        //Visualizar las propiedades de gameToEdit
        /*
        for(let v of gameToEdit.entries()){
            console.log(`${v[0]} - ${v[1]}`)
        }
        */
        
        //console.log(idGameToEdit)
        ui.updateGame(idGameToEdit, gameToEdit); //Actualizar la foto 
        ui.renderMessage('Game Updated Successfully!', 'success', 3500);
    } else {    //Agregar
        let headerForm = document.getElementById('headerStatusEdit')
        let btnStatusEdit = document.getElementById('btnStatusEdit')
        //Cambiar encabezado y btn del form
        headerForm.textContent = 'Add New Game';
        btnStatusEdit.textContent = 'Save Game';
        //Formulario virtual de JS
        let formData = new FormData();
        formData.append('image', image[0]);
        formData.append('title', title);
        formData.append('description', description);
        formData.append('author', author);
        formData.append('category', category);

        ui.addNewGame(formData);
        ui.renderMessage('Game Added Successfully!', 'success', 3500);
    }
    statusEdit = false; //Regresar estado edit al valor original
})

//Eliminar
document.getElementById('games-cards').addEventListener('click', e => {
    if (e.target.classList.contains('delete')) {   //capturar el elemento que tiene la clase delete
        //console.log(e.target.getAttribute('_id'))
        const r = confirm('Are you sure to delete this Game?')
        if (r) {
            const ui = new UI;
            ui.deleteGame(e.target.getAttribute('_id'))
            ui.renderMessage('Game Deleted Successfully!', 'info', 3500)
        }
    }
})

// Eliminar la imagen anterior con mutler (Actualizar) ===> Controladores del Backend!