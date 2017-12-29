'use strict';

var mongoose = require('mongoose'),
    Category = mongoose.model('Categories');

exports.get_all = function(req, res) {
  Category.find({}, function(err, category) {
    if (err)
      res.send(err);
    res.json(category);
  });
};

exports.create = function(req, res) {
  var new_category = new Category(req.body);
  new_category.save(function(err, category) {
    if (err)
      res.send(err);
    res.json(category);
  });
};

exports.get_one = function(req, res) {
  Category.findById(req.params.id, function(err, category) {
    if (err)
      res.send(err);
    res.json(category);
  });
};

exports.update = function(req, res) {
  Category.findOneAndUpdate({_id: req.params.id},req.body,{new: true},
      function(err, category) {
        if (err)
          res.send(err);
        res.json(category);
      });
};

exports.delete = function(req, res) {
  console.log(req.params)
  Category.remove({
    _id: req.params.id
  }, function(err, category) {
    if (err)
      res.send(err);
    console.log(category)
    res.json({ message: 'Category successfully deleted' });
  });
};