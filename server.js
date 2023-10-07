const express = require('express');
var exphbs  = require('express-handlebars');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
require('./db/db');
const userRoutes = require('./routes/userRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
// const templateRoutes = require('./routes/templateRoutes');
const path = require('path');
const bodyParser = require('body-parser');
var cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// app.use(express.json());
// app.use(bodyParser.urlencoded({extended:false}));
app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // res.header('Access-Control-Allow-Credentials', 'true');
    // res.header("Access-Control-Allow-Origin", req.headers.origin);
    // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    // res.header("X-Content-Type-Options", "nosniff");
    // res.header("X-XSS-Protection", "1; mode=block");
    // res.header("Cache-Control", "no-cache, no-store, must-revalidate;");
    // res.header("X-Frame-Options", "sameorigin");
    next();
  });



app.use('/api/v1',userRoutes);
app.use('/api/v1',categoryRoutes);
app.use('/api/v1',serviceRoutes);
// app.use(templateRoutes);


app.listen(PORT, () => console.log(`Server up and running at PORT ${PORT}`));
