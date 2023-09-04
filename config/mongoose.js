
const mongoose = require('mongoose');

const uri = 'mongodb+srv://kunal97:PQs25tmPIzim9oWr@cluster3.qamcott.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(uri)//establishes connection to the MongoDB server.
     .catch((err) => console.log("connection " + err));

const db = mongoose.connection;//mongoose.connection object serves as the interface through which you can interact with the MongoDB database connection,
// perform operations, and handle events related to the connection.

db.on('error', console.error.bind(console, "Error connecting to MongoDB Atlas"));


db.once('open', function () {
     console.log('Connected to Database');
});
