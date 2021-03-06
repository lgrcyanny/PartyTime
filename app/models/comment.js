/**
 * Model Dependencies
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var _ = require('underscore');
var utils = require('../../lib/utils');

/**
 * Party Schema
 */
var CommentSchema = new Schema({
  party: {type: Schema.ObjectId, ref: 'Party'},
  content: {type: String, default: '' },
  user: { type: Schema.ObjectId, ref: 'User' },
  createdAt: {type: Date, default: Date.now, get: utils.formatDate}
});

CommentSchema.statics = {
  findComments: function(partyId, callback) {
    this.find({party: partyId})
      .populate('user', '_id username')
      .sort({'createdAt': -1})
      .exec(callback);
  },
  update: function (commentId, data, callback) {
    this.findByIdAndUpdate(noteId, data, callback);
  },
  remove: function (commentId, callback) {
    this.findByIdAndRemove(noteId, callback);
  }
};

mongoose.model('Comment', CommentSchema);