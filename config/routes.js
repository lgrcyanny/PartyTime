
/*!
 * Module dependencies.
 */

//var async = require('async');

/**
 * Controllers
 */

var users = require('../app/controllers/users');
//var articles = require('../app/controllers/articles')
var auth = require('./middlewares/authorization');
var parties = require('../app/controllers/parties');
var notes = require('../app/controllers/notes');
var comments = require('../app/controllers/comments');

/**
 * Route middlewares
 */

//var articleAuth = [auth.requiresLogin, auth.article.hasAuthorization]

/**
 * Expose routes
 */

module.exports = function (app, passport) {

  // Users routes
  app.get('/signin', users.signin);
  app.get('/signup', users.signup);
  app.get('/logout', users.logout);
  app.post('/users', users.create);
  app.post('/users/session',
    passport.authenticate('local', {
      failureRedirect: '/signin',
      failureFlash: 'Invalid email or password.'
    }), users.session);
  // app.param('userId', users.user);
  app.get('/users/query', users.ajaxFindUsers);

  // Parties routes
  // Parties List
  app.get('/', auth.requiresLogin, parties.index);
  app.get('/parties', auth.requiresLogin, parties.index);
  app.param('partyId', parties.loadPartyToRequest);

  // Create Party
  app.get('/parties/new', auth.requiresLogin, parties.renderCreatePage);
  app.post('/parties', auth.requiresLogin, parties.actionCreate);

  // Browser Party item
  app.get('/parties/:partyId', auth.requiresLogin, parties.renderPartyItem);

  // Update or Edit Party
  app.get('/parties/:partyId/edit', auth.requiresLogin, parties.renderEditPage);
  app.post('/parties/:partyId', auth.requiresLogin, parties.actionUpdate);

  // Ajax delete one party item
  app.delete('/parties/:partyId', auth.requiresLogin, parties.ajaxDeleteItem);

  // Ajax add one invitee
  app.post('/parties/:partyId/invitees', auth.requiresLogin, parties.ajaxAddInvitee);
  app.post('/parties/:partyId/invitees/bulk', auth.requiresLogin, parties.ajaxBulkAddInvitees);
  app.delete('/parties/:partyId/invitees', auth.requiresLogin, parties.ajaxRemoveInvitee);

  // Notes Routes
  // Ajax add one note
  app.post('/parties/:partyId/notes', auth.requiresLogin, notes.create);
  // Ajax update note
  app.put('/parties/:partyId/notes/:noteId', auth.requiresLogin, notes.updateNote);
  // Ajax load notes
  app.get('/parties/:partyId/notes', auth.requiresLogin, notes.listNotes);

  // Comments Routes
  app.post('/parties/:partyId/comments', auth.requiresLogin, comments.create);
  app.get('/parties/:partyId/comments', auth.requiresLogin, comments.list);
}
