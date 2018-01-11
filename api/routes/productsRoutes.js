'use strict';
module.exports = function(app) {

  let productsController = require('../controllers/productsController'),
      fs = require('fs'),
      sharp = require('sharp');

  // app.route('/api/products')
  //     .get(productsController.get_all)
  //     .post(productsController.create);
  app.get('/api/products', productsController.get_all)

  app.post('/api/products', function(req,res) {
    if (req.files) {
      let sampleFile = req.files,
          fileCounter = 0,
          savingPhtoName = '';

      req.body.photos = [];
      req.body.name = req.body.name.trim();
      savingPhtoName = req.body.name.replace(/\s/ig, '_');

      if (!fs.existsSync(`./public/products/${savingPhtoName}`)){
        fs.mkdirSync(`./public/products/${savingPhtoName}`);
      }

      for (let value in sampleFile) {
        req.body.photos.push(`/products/${savingPhtoName}/${savingPhtoName}_${fileCounter}.jpg`)
        sampleFile[value].mv(`./public/products/${savingPhtoName}/${savingPhtoName}_${fileCounter}.jpg`, function(err) {
          if (err)
            return res.status(500).send(err);
          req.body.photos.push(`./public/products/${savingPhtoName}/${savingPhtoName}_${fileCounter}.jpg`);
          sharp(`./public/products/${savingPhtoName}/${savingPhtoName}_1.jpg`).resize(300, 306)
              .toFile(`./public/products/${savingPhtoName}/preview.jpg`, function(err) {
                console.log(err)
              });
        });
        fileCounter++;
      }

      req.body.preview = req.body.photos[0];
    }


    productsController.create(req,res)
  });


  app.route('/api/products/:id')
      .get(productsController.get_one)
      .put(productsController.update)
      .delete(productsController.delete);
};