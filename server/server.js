require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app = express();
const cookieParser = require('cookie-parser');
// const jwt = require("jsonwebtoken");
// const myFirstSecret = process.env.FIRST_SECRET_KEY;
app.use(cookieParser());
app.use(cors({credentials: true, origin: 'http://localhost:5173'}));
app.use(express.json());                           
app.use(express.urlencoded({ extended: true }));  
require('./config/mongoose.config');   
require('./routes/users.route')(app);
require('./routes/products.route')(app);
require('./routes/category.route')(app);
// require('./routes/orders.route')(app);
// require('./routes/reviews.route')(app);
// require('./routes/ratings.route')(app);
require('./routes/wishlist.route')(app);
// require('./routes/cart.route')(app);

app.listen(8000, () => {
    console.log("Listening at Port 8000")
})