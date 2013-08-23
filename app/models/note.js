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
var NoteSchema = new Schema({
  party: {type: Schema.ObjectId, ref: 'Party'},
  user: {type: Schema.ObjectId, ref: 'User'},
  availableDates: [{
    startDateTime: {type: Date, get: utils.formatDate},
    endDateTime: {type: Date, get: utils.formatDate}
  }],
  message: {type: String, default: ''},
  createdAt: {type: Date, default: Date.now, get: utils.formatDate}
});

NoteSchema.methods = {

};

NoteSchema.statics = {
  findNotes: function(partyId, callback) {
    this.find({party: partyId})
      .populate('user', '_id username')
      .sort({'createdAt': -1})
      .exec(callback);
  },
  update: function (noteId, data, callback) {
    this.findByIdAndUpdate(noteId, data, callback);
  },
  remove: function (noteId, callback) {
    this.findByIdAndRemove(noteId, callback);
  }
};

mongoose.model('Note', NoteSchema);
