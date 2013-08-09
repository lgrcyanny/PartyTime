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
var PartySchema = new Schema({
  host: {type: Schema.ObjectId, ref: 'User'},
  partyName: {type: String, default: ''},
  startDateTime: {type: Date, get: utils.formatDate},
  endDateTime: {type: Date, get: utils.formatDate},
  location: {type:String, default: ''},
  description: {type: String, default: ''},
  activeStatus: {type:Boolean, default: true},
  finalDecision: {
    startDateTime: {type: Date, get: utils.formatDate},
    endDateTime: {type: Date, get: utils.formatDate}
  },
  createdAt: {type: Date, default: Date.now, get: utils.formatDate},
  invitees: [{type: Schema.ObjectId, ref: 'User'}]
});

PartySchema.path('partyName').validate(function (partyName) {
  return partyName.length > 0;
}, 'Party name can\'t be blank');


PartySchema.methods = {
  addInvitee: function (user, callback) {
    this.invitees.push(user._id);
    this.save(callback);
  },

  removeInvitee: function (inviteeId, callback) {
    this.invitees.pull(inviteeId);
    this.save(callback);
  },

  addFinalDecision: function (finalDate, callback) {
    this.finalDecision = _.clone(finalDate);
    this.save(callback);
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
      .populate('host')
      .populate('invitees', '_id name email username')
      .exec(callback);
  },

  list: function (hostId, callback) {
    this.find({host: hostId})
      .sort({'createdAt': -1, 'activeStatus': 1})
      .exec(callback);
  },

  delete: function (partyId, callback) {
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