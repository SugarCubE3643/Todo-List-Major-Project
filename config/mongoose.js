// Configuring mongoose

const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

mongoose.connect('mongodb://localhost:27017/todolist_db'), {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error connecting to the database'));

db.once('open', function(){
    console.log('Mongoose connected successfully');
});