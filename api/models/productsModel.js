'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  product_id: mongoose.Schema.ObjectId,
  name: {
    type: String,
    required: [true, 'Empty name'],
    unique: true
  },
  category_name: {
    type: String,
    required: [true, 'Empty category name']
  },
  preview: {
    type: String,
  },
  photos: {
    type: Array
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