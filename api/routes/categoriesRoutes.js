'use strict';
module.exports = function(app) {
  var categoriesController = require('../controllers/categoriesController');

  app.route('/api/categories')
      .get(categoriesController.get_all)
      .post(categoriesController.create);


  app.route('/api/categories/:id')
      .get(categoriesController.get_one)
      .put(categoriesController.update)
      .delete(categoriesController.delete);
};