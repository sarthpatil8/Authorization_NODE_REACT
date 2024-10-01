const mongoose = require('mongoose');




const User = mongoose.model('User', {

  name:{type: String},
  mobile_number:{type: String},
  password:{type: String},
  password_confirmation:{type: String},
  registered_date : {type : Date , default: new Date()},
  status : {type : Boolean , default : false},
   
});


module.exports = User;

