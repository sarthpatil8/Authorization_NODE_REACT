const User = require('./userModel');


//Function for checking mobile number
function isValidPhoneNumber(number) {
  const PhoneNumberRegex = /^[6-9]\d{9}$/;
  return PhoneNumberRegex.test(number);
}


module.exports = isValidPhoneNumber;