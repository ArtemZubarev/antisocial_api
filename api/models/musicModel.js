'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MusicBandSchema = new Schema({
  product_id: mongoose.Schema.ObjectId,
  name: {
    type: String,
    required: [true, 'Empty name'],
    unique: true
  },
  genre: {
    type: String,
    required: [true, 'Empty genre']
  },
  preview: {
    type: String,
  },
  photos: {
    type: Array
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

module.exports = mongoose.model('Bands', MusicBandSchema);