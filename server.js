const express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    mongoose = require('mongoose'),
    Product = require('./api/models/productsModel'),
    Category = require('./api/models/categoriesModel'),
    Music = require('./api/models/musicModel'),
    bodyParser = require('body-parser'),
    config = require('./api/config/config'),
    path = require('path'),
    fileUpload = require('express-fileupload'),
    fs = require('fs');


mongoose.Promise = global.Promise;
mongoose.connect(config.connection);

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(fileUpload());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

let categoriesRoutes = require('./api/routes/productsRoutes');
let productsRoutes = require('./api/routes/categoriesRoutes');
let musicRoutes = require('./api/routes/musicRoutes');

categoriesRoutes(app);
productsRoutes(app);
musicRoutes(app);

app.listen(port);

app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});

console.log('todo list RESTful API server started on: ' + port);