/**
 * Notes controller: responsible for the discussion of the current party, every
 * invitee can create note to give his/her available dates
 */
var mongoose = require('mongoose');
var Note = mongoose.model('Note');
var _ = require('underscore');
var utils = require('../../lib/utils');

var formatNote = function (note) {
  var formatedNote = {
    username: note.user.username,
    availableDates: [],
    message: note.message,
    createdAt: note.createdAt
  };
  for (var i = 0; i < note.availableDates.length; i++) {
    var date = {
      startDateTime: note.availableDates[i].startDateTime,
      endDateTime: note.availableDates[i].endDateTime
    };
    formatedNote.availableDates.push(date);
  }
  return formatedNote;
}

exports.create = function (req, res) {
  var note = new Note(req.body);
  note.party = req.party;
  note.user = req.user;
  note.save(function (err, newNote) {
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
      note: formatNote(note)
    })
  });
};

exports.listNotes = function (req, res) {
  var partyId = req.params.partyId;
  Note.findNotes(partyId, function (err, notes) {
    if (err) {
      return res.send({
        success: false,
        errors: untils.errors(err.errors || err)
      });
    }
    var formatedNotes = [];
    for (var i = 0; i < notes.length; i++) {
      formatedNotes.push(formatNote(notes[i]));
    }
    res.send({
      success: true,
      notes: formatedNotes
    });
  });
};

exports.updateNote = function(req, res) {
  var noteId = req.params.noteId;
  var noteData = req.body;
  Note.update(noteId, noteData, function(err, note) {
    if (err) {
      return res.send({
        success: false,
        errors: untils.errors(err.errors || err)
      });
    }
    res.send({
      success: true,
      note: formatNote(note)
    })
  })
}