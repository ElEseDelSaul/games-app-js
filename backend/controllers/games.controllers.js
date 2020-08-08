const { unlink } = require('fs-extra')
const path = require('path')
const gamesCtrl = {}
//Model
const Game = require('../models/Game')

gamesCtrl.showGames = async (req, res) => {
    const Games = await Game.find().sort({ 'createdAt': -1 })  //Ordenar del mas reciente al mas antiguo
    res.json(Games)
}

gamesCtrl.saveGame = async (req, res) => {
    const { title, description, author, category } = req.body;
    const imagePath = '/uploads/' + req.file.filename;
    const newGame = new Game({ title, description, author, category, imagePath })
    await newGame.save()
    res.json({ "message": "Game Saved" })
}

gamesCtrl.deleteGame = async (req, res) => {
    //console.log(req.params.id) 
    const gameDeleted = await Game.findByIdAndDelete(req.params.id)
    unlink(path.resolve('./backend/public' + gameDeleted.imagePath))    //Eliminar imagen en carpeta uploads
    res.json({ "message": "Game Removed" })
}

gamesCtrl.getOneGame = async (req, res) => {
    const game = await Game.findById(req.params.id)
    console.log('GetOne:')
    console.log(game)
    res.json(game)
}

gamesCtrl.updateGame = async (req, res) => {
    let gameUpdate = {}
    const gameAnt = await Game.findById(req.params.id)
    const { title, description, author, category } = req.body;  //Data de Form
    //VALIDAR SI req.file.filename VIENE VACIO CONSERVAR imagePath anterior sino sustituir directorio
    if (req.file) {  ///Si mandan Imagen nueva
        //Capturar nombre de archivo ACTUAL con extension
        const imagePath = `/uploads/${req.file.filename}`;  //Data Imagen
        gameUpdate.imagePath = imagePath;
        gameUpdate = { title, description, author, category, imagePath };
        //Eliminar imagen anterior
        unlink(path.resolve(`./backend/public/${gameAnt.imagePath}`))    //Eliminar de multer el archivo ant.
    } else {    //Si no se manda imagen
        gameUpdate = { title, description, author, category };
    }
    await Game.findByIdAndUpdate(req.params.id, gameUpdate);    //Actualizar el registro en DB  
    res.json({ "message": "Game Updated" });
}

module.exports = gamesCtrl
