const mongoose = require('mongoose');

const {
    DB_PROTOCOLO,
    DB_HOST,
    DB_NAME
} = process.env;

mongoose.connect(`${DB_PROTOCOLO}://${DB_HOST}/${DB_NAME}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex:true,
    useFindAndModify: false
})
    .then(db => { console.log('Database is connected') })
    .catch(err => { console.log('Error DB: ' + err) })
