'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductSchema = new Schema({
  product_id: mongoose.Schema.ObjectId,
  name: {
    type: String,
    required: [true, 'Name of product can not by empty'],
    unique: true
  },
  category_name: {
    type: String,
    required: [true, 'Name of category can not by empty']
  },
  preview: {
    type: String,
  },
  s_count: {
    type: Number,
    default: 0,
    min: 0
  },
  m_count: {
    type: Number,
    default: 0,
    min: 0
  },
  l_count: {
    type: Number,
    default: 0,
    min: 0
  },
  xl_count: {
    type: Number,
    default: 0,
    min: 0
  },
  Created_date: {
    type: Date,
    default: Date.now
  },
  status: {
    type: [{
      type: String,
      enum: ['pending', 'ongoing', 'completed']
    }],
    default: ['pending']
  }
});

module.exports = mongoose.model('Products', ProductSchema);