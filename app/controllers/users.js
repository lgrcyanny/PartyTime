
/**
 * Module dependencies.
 */

var mongoose = require('mongoose')
  , User = mongoose.model('User')
  , utils = require('../../lib/utils')

var login = function (req, res) {
  if (req.session.returnTo) {
    res.redirect(req.session.returnTo)
    delete req.session.returnTo
    return
  }
  res.redirect('/')
}

exports.signin = function (req, res) {
  res.render('users/signin', {
    title: 'Sign in to party time',
    message: req.flash('error')
  });
}

/**
 * Auth callback
 */

exports.authCallback = login


/**
 * Session
*/
exports.session = login;


/**
 * Show sign up form
 */
exports.signup = function (req, res) {
  res.render('users/signup', {
    title: 'Sign up to party time'
  });
}

/**
 * Logout
 */

exports.logout = function (req, res) {
  req.logout()
  res.redirect('/');
}

/**
 * Create user
 */

exports.create = function (req, res) {
  var user = new User(req.body)
  user.provider = 'local'
  user.save(function (err) {
    if (err) {
      return res.render('users/signup', {
        errors: utils.errors(err.errors),
        user: user,
        title: 'Sign up to Party Time'
      })
    }

    // manually login the user once successfully signed up
    req.logIn(user, function(err) {
      if (err) return next(err)
      return res.redirect('/')
    })
  })
}

/**
 *  Show profile
 */

exports.show = function (req, res) {
  var user = req.profile
  res.render('users/show', {
    title: user.name,
    user: user
  })
}

/**
 * Find user by id
 */

exports.user = function (req, res, next, id) {
  User
    .findOne({ _id : id })
    .exec(function (err, user) {
      if (err) return next(err)
      if (!user) return next(new Error('Failed to load User ' + id))
      req.profile = user
      next()
    })
}
