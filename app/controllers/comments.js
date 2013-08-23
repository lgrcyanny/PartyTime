
/**
 * Module dependencies.
 */

var mongoose = require('mongoose');
var Comment = mongoose.model('Comment');
var _ = require('underscore');
var utils = require('../../lib/utils');

/**
 * Create comment
 */
exports.create = function (req, res) {
  var comment = new Comment(req.body);
  comment.party = req.party;
  comment.user = req.user;
  comment.save(function (err, newComment) {
    if (err) {
      res.send({
        success: false,
        errors: utils.errors(err.errors || err)
      });
      return;
    }
    res.send({
      success: true,
      username: req.user.username,
      note: newComment
    });
  });
};

exports.list = function (req, res) {
  var partyId = req.params.partyId;
  Comment.findComments(partyId, function (err, comments) {
    if (err) {
      res.send({
        success: false,
        errors: utils.errors(err.errors || err)
      });
      return;
    }
    res.send({
      success: true,
      comments: comments
    });
  });
};
