
var moment = require('moment');
/**
 * Formats mongoose errors into proper array
 *
 * @param {Array} errors
 * @return {Array}
 * @api public
 */

exports.errors = function (errors) {
  var keys = Object.keys(errors)
  var errs = []

  // if there is no validation error, just display a generic error
  if (!keys) {
    console.log(errors);
    return ['Oops! There was an error']
  }

  keys.forEach(function (key) {
    errs.push(errors[key].type)
  })

  return errs
};

exports.formatDate = function(originDate) {
  return moment(originDate).format("YYYY-MM-DD HH:mm");
};
