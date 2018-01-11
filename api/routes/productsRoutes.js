'use strict';
module.exports = function(app) {

  let productsController = require('../controllers/productsController'),
      fs = require('fs'),
      sharp = require('sharp');

  // app.route('/api/products')
  //     .get(productsController.get_all)
  //     .post(productsController.create);
  app.get('/api/products', productsController.get_all);

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
      let previewType = sampleFile.preview.mimetype.replace('image/', '');

      sampleFile.preview.mv(`./public/products/${savingPhtoName}/temp_preview.${previewType}`, function(err) {
        if (err)
          return res.status(500).send(err);
        console.log('sass')
        sharp(`./public/products/${savingPhtoName}/temp_preview.${previewType}`)
            .resize(590, 603)
            .crop(sharp.strategy.entropy)
            .toFile(`./public/products/${savingPhtoName}/preview.${previewType}`, function(err) {
              if (err) return res.status(500).send(err);
              fs.unlink(`./public/products/${savingPhtoName}/temp_preview.${previewType}`, function (err) {
                if (err) console.log(err)
              });

            });
      });
      req.body.preview = `/products/${savingPhtoName}/preview.${previewType}`;
      for (let value in sampleFile) {
        let type = sampleFile[value].mimetype.replace('image/', '');
        req.body.photos.push(`/products/${savingPhtoName}/${savingPhtoName}_${fileCounter}.jpg`);

        sampleFile[value].mv(`./public/products/${savingPhtoName}/${savingPhtoName}_${fileCounter}.jpg`, function(err) {
          if (err)
            return res.status(500).send(err);
        });
        fileCounter++;
      }


    }
    productsController.create(req,res)
  });


  app.route('/api/products/:id')
      .get(productsController.get_one)
      .put(productsController.update)
      .delete(productsController.delete);
};