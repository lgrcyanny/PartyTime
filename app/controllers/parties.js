var mongoose = require('mongoose');
var Party = mongoose.model('Party');
var _ = require('underscore');
var utils = require('../../lib/utils');
var moment = require('moment');

var isPartyOwner = function (req) {
  return req.user._id.equals(req.party.host._id);
};

var getInvitees = function (invitees) {
  var res = '';
  for (var i = 0; i < invitees.length; i++) {
    if (i !== invitees.length - 1) {
      res += invitees[i].username + ', ';
    } else {
      res += invitees[i].username;
    }
  }
  return res;
};

exports.index = function (req, res) {
  //console.log(req.user.hashed_password);
  Party.list(req.user._id, function(err, parties) {
    if (err) {
      return ;//render 404
    }
    res.render('parties/list', {
      parties: parties
    });
  });
};

exports.loadPartyToRequest = function (req, res, next, id) {
  Party.load(id, function(err, party) {
    if (err) {
      return next(err);
    }
    if (!party) {
      return next(new Error('Party not found.'));
    }
    req.party = party;
    next();
  });
};

exports.renderCreatePage = function (req, res) {
  res.render('parties/create', {
    title: 'Create a new party',
    party: new Party({}),
    action: '/parties',
    moment: moment
  });
};

exports.actionCreate = function (req, res) {
  var party = new Party(req.body);
  party.host = req.user;
  party.save(function(err, newparty) {
    if (!err) {
      req.flash('success', 'Successfully created a new party.');
      return res.redirect('/parties/' + newparty._id);
      //return res.redirect('/');
    }
    res.render('parties/new', {
      errors: utils.errors(err.errors || err),
      party: party,
      action: '/parties',
      moment: moment
    });
  });
};

exports.renderEditPage = function (req, res) {
  res.render('parties/edit', {
    title: 'Edit ' + req.party.partyName,
    party: req.party,
    action: '/parties/' + req.party._id,
    moment: moment
  });
};

exports.actionUpdate = function (req, res) {
  var party = req.party;
  party = _.extend(party, req.body);
  party.save(function(err, newparty) {
    if (!err) {
      req.flash('success', 'Successfully update party.');
      return res.redirect('/parties/' + newparty._id);
    }
    res.render('parties/edit', {
      title: 'Update ' + req.party.partyName,
      party: party,
      action: '/parties/' + req.party._id,
      errors: utils.errors(err.errors || err),
      moment: moment
    });
  });
};

exports.ajaxDeleteItem = function (req, res) {
  var partyId = req.param('partyId');
  Party.deleteById(partyId, function (err) {
    if (err) {
      res.send({
        success: false
      });
    }
    res.send({
      success: true
    });
  })
}

exports.renderPartyItem = function (req, res) {
  var party = req.party;
  party.getInvitees(function (err) {
    if (err) {
      return; // render 404
    }
    res.render('parties/item', {
      title: party.partyName,
      party: party,
      invitees: party.invitees.length ? getInvitees(party.invitees) : 'No invitees yet.'
    });
  });
};

exports.ajaxAddInvitee = function (req, res) {
  var party = req.party;
  var inviteeId = req.body.inviteeId;
  party.addInvitee(inviteeId, function (err) {
    if (err) {
      res.send({
        success: false,
        err: utils.errors(err.errors || err)
      });
      return;
    }
    res.send({
      success: true,
      party: party
    });
  });
};

exports.ajaxBulkAddInvitees = function (req, res) {
  var party = req.party;
  var invitees = req.body.invitees;
  party.bulkAddInvitees(invitees, function (error) {
    if (error) {
      res.send({
        success: false,
        errors: utils.errors(error.errors || error)
      });
      return;
    }
    res.send({
      success: true,
      party: party
    });
  });
};

exports.ajaxRemoveInvitee = function (req, res) {
  var party = req.party;
  var inviteeId = req.body.inviteeId;
   party.removeInvitee(inviteeId, function (err) {
    if (err) {
      res.send({
        success: false
      })
      return;
    }
    res.send({
      success: true,
      party: party
    });
  });
}