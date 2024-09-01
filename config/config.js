
require('dotenv').config();

module.exports = {
  PORT: process.env.PORT || 5000, 
  mongoURI: process.env.MONGO_URI,

  jwtTokenSecretKey: process.env.JWT_TOKEN_SECRET_KEY,
};




// reactAppAuthorizationKey: process.env.REACT_APP_AUTHORIZATION_KEY,
