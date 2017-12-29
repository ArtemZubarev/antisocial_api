'use strict';
module.exports = function(app) {
  var productsController = require('../controllers/productsController');

  app.route('/api/products')
      .get(productsController.get_all)
      .post(productsController.create);


  app.route('/api/products/:id')
      .get(productsController.get_one)
      .put(productsController.update)
      .delete(productsController.delete);
};