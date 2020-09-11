//Require the library
const mongoose = require('mongoose');

//conect to database
mongoose.connect('mongodb://localhost/contact_list_db');

//acquire the connection (testing connection)
const db = mongoose.connection;

//if some error occurs
db.on('error',console.error.bind(console, 'connection error:'));

//if database is successfully connected
db.once('open', function(){
    console.log('Successfully connected dataBase!!');
})