var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    mongoose = require('mongoose'),
    Product = require('./api/models/productsModel'),
    Category = require('./api/models/categoriesModel'),
    bodyParser = require('body-parser'),
    config = require('./api/config/config'),
    path = require('path');;


mongoose.Promise = global.Promise;
mongoose.connect(config.connection);

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

var categoriesRoutes = require('./api/routes/productsRoutes');
var productsRoutes = require('./api/routes/categoriesRoutes');
categoriesRoutes(app);
productsRoutes(app);

app.listen(port);

app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});

console.log('todo list RESTful API server started on: ' + port);