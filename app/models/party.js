/**
 * Model Dependencies
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var _ = require('underscore');
var utils = require('../../lib/utils');

/**
 * Party Schema
 */
var PartySchema = new Schema({
  host: {type: Schema.ObjectId, ref: 'User'},
  partyName: {type: String, default: ''},
  startDateTime: {type: Date, get: utils.formatDate},
  endDateTime: {type: Date, get: utils.formatDate},
  location: {type:String, default: ''},
  description: {type: String, default: ''},
  activeStatus: {type:Boolean, default: true},
  finalDecided: {type:Boolean, default: false},
  createdAt: {type: Date, default: Date.now, get: utils.formatDate},
  invitees: [{type: Schema.ObjectId, ref: 'User'}]
});

PartySchema.path('partyName').validate(function (partyName) {
  return partyName.length > 0;
}, 'Party name can\'t be blank');


PartySchema.methods = {
  isPartyOwner: function (userId) {
    return this.host._id.equals(userId);
  },

  addInvitee: function (inviteeId, callback) {
    this.invitees.push(inviteeId);
    this.save(callback);
  },

  /**
   * Bulk Add invitees
   * @param  {Array}   invitees [description]
   * @param  {Function} callback [description]
   */
  bulkAddInvitees: function (invitees, callback) {
    if (_.isArray(invitees)) {
      for (var i = 0; i < invitees.length; i++) {
        this.invitees.pull(invitees[i]);
        this.invitees.push(invitees[i]);
      }
      this.save(callback);
    } else {
      callback(new Error('Argument error, invitees is ' + (typeof invitees) + ' not array'));
    }
  },

  removeInvitee: function (inviteeId, callback) {
    this.invitees.pull(inviteeId);
    this.save(callback);
  },

  getInvitees: function (callback) {
    this.populate({
      path: 'invitees',
      select: '_id username'
    }, callback);
  },

  addFinalDecision: function (finalDate, callback) {

  }
};

PartySchema.statics = {

  /**
   * Load a party info by partyId
   * @param  {ObjectId}   partyId
   * @param  {Function} callback Return the found data to callback
   */
  load: function (partyId, callback) {
    this.findById(partyId)
      .populate('host', '_id username')
      .exec(callback);
  },

  list: function (hostId, callback) {
    this.find({host: hostId})
      .sort({'createdAt': -1, 'activeStatus': 1})
      .exec(callback);
  },

  deleteById: function (partyId, callback) {
    this.findByIdAndRemove(partyId, callback);
  },

  update: function (partyId, partyData, callback) {
    this.findByIdAndUpdate(partyId, partyData, callback);
  },

  changeActiveStatus: function(partyId, isActive,callback) {
    this.findByIdAndUpdate(partyId, {activeStatus: isActive}, callback);
  }
}

mongoose.model('Party', PartySchema);