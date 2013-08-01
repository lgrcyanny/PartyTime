
/*!
 * Module dependencies.
 */

var async = require('async');

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
  app.get('/signin', users.signin)
  app.get('/signup', users.signup)
  app.get('/logout', users.logout)
  app.post('/users', users.create)
  app.post('/users/session',
    passport.authenticate('local', {
      failureRedirect: '/signin',
      failureFlash: 'Invalid email or password.'
    }), users.session)

  // Parties routes
  app.get('/', auth.requiresLogin, parties.index);

  // app.param('userId', users.user);



}
