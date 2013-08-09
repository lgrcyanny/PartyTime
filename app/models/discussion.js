/**
 * Model Dependencies
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var _ = require('underscore');

/**
 * Party Schema
 */
var DiscussionSchema = new Schema({
  partyId: {type: Schema.ObjectId, ref: 'Party'},
  user: {type: Schema.ObjectId, ref: 'User'},
  availabelDates: [{
    startDateTime: {type: Date},
    endDateTime: {type: Date}
  }],
  message: {type: String, default: ''},
  createdAt: {type: Date, default: Date.now}
});

mongoose.model('Discussion', DiscussionSchema);