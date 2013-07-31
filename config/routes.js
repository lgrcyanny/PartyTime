
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
var home = require('../app/controllers/home');


/**
 * Route middlewares
 */

//var articleAuth = [auth.requiresLogin, auth.article.hasAuthorization]

/**
 * Expose routes
 */

module.exports = function (app, passport) {

  app.get('/', home.index);
  app.get('/signin', users.signin)
  app.get('/signup', users.signup)
  // user routes
  // app.get('/login', users.login)
  // app.get('/signup', users.signup)
  app.get('/logout', users.logout)
  app.post('/users', users.create)
  app.post('/users/session',
    passport.authenticate('local', {
      failureRedirect: '/login',
      failureFlash: 'Invalid email or password.'
    }), users.session)
  // app.get('/users/:userId', users.show)

  // app.param('userId', users.user);



}
