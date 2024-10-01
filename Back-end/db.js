const mongoose = require('mongoose');

//DB name = E_Book database
  
     mongoose.connect('mongodb://localhost:27017/sample', {
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

module.exports = db;
  