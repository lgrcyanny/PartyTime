
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

  // Parties routes
  // Ajax delete party item
  //app.post('/parties/delete', auth.requiresLogin, parties.ajaxDeleteItem);
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


  app.delete('/parties/:partyId', auth.requiresLogin, parties.ajaxDeleteItem);


}
