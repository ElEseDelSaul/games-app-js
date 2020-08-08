const mongoose = require('mongoose');

const {MONGO_URI} = process.env;

mongoose.connect(`${MONGO_URI}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex:true,
    useFindAndModify: false
})
    .then(db => { console.log('Database is connected') })
    .catch(err => { console.log('Error DB: ' + err) })
