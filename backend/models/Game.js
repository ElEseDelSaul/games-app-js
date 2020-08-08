const { Schema, model } = require('mongoose')

const GameSchema = new Schema({
    title: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    author: { type: String, required: true },
    category: { type: String, required: true },
    imagePath: { type: String }
},
{
    timestamps: true
})

module.exports = model('Game', GameSchema)