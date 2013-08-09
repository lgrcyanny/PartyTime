/**
 * Model Dependencies
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var _ = require('underscore');

/**
 * Party Schema
 */
var CommentSchema = new Schema({
  partyId: {type: Schema.ObjectId, ref: 'Party'},
  content: {type: String, default: '' },
  user: { type: Schema.ObjectId, ref: 'User' },
  createdAt: {type: Date, default: Date.now }
});

mongoose.model('Comment', CommentSchema);