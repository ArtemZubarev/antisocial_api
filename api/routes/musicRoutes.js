'use strict';
module.exports = function(app) {
  var musicController = require('../controllers/musicController');

  app.route('/api/music')
      .get(musicController.get_all)
      .post(musicController.create);


  app.route('/api/music/:id')
      .get(musicController.get_one)
      .put(musicController.update)
      .delete(musicController.delete);
};