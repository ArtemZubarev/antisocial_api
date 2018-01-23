'use strict';

var mongoose = require('mongoose'),
    Band = mongoose.model('Bands');

exports.get_all = function(req, res) {
  Band.find({}, function(err, product) {
    if (err)
      res.send(err);
    res.json(product);
  });
};

exports.create = function(req, res) {
  var new_product = new Band(req.body);
  new_product.save(function(err, product) {
    if (err)
      res.send(err);
    res.json(product);
  });
};

exports.get_one = function(req, res) {
  Band.findById(req.params.id, function(err, product) {
    if (err)
      res.send(err);
    res.json(product);
  });
};

exports.update = function(req, res) {
  Band.findOneAndUpdate({_id: req.params.id},req.body,{new: true},
      function(err, product) {
        if (err)
          res.send(err);
        res.json(product);
      });
};

exports.delete = function(req, res) {
  Band.remove({
    _id: req.params.id
  }, function(err, product) {
    if (err)
      res.send(err);
    res.json({ message: 'Band successfully deleted' });
  });
};