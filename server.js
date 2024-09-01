const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const Food = require('./models/Products');
const {PORT,mongoURI} =require("./config/config");

const foodRoutes = require('./Routes/foodRoutes');
const userProfileRoute =require('./Routes/profileRoute');
const authRoutes = require('./Routes/authRoute');
const cartRoutes=require('./Routes/cart')
const orderRoutes=require('./Routes/orderRoute')
const auth_expire_Routes = require('./Routes/auth'); 

const app = express();


app.use(cors());
// app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.json({ limit: '50mb' }));


mongoose.connect(mongoURI,{family:4})
.then(() => {
  console.log('Connected');
})
.catch(err => {
  console.error('Failed to connect ', err);
});


app.use(foodRoutes);
app.use('/api/user',userProfileRoute)
app.use('/api/auth', authRoutes);
app.use(cartRoutes);
app.use(orderRoutes);
app.use('/api', auth_expire_Routes);






app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
