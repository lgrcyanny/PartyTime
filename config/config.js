
var path = require('path');
var rootPath = path.normalize(__dirname + '/..');
var templatePath = path.normalize(__dirname + '/../app/mailer/templates');
var notifier = {
  service: 'postmark',
  APN: false,
  email: false, // true
  actions: ['comment'],
  tplPath: templatePath,
  key: 'POSTMARK_KEY',
  parseAppId: 'PARSE_APP_ID',
  parseApiKey: 'PARSE_MASTER_KEY'
};

module.exports = {
  development: {
    db: 'mongodb://localhost/partytime_dev',
    root: rootPath,
    notifier: notifier,
    app: {
      name: 'Party Time'
    },
    session: {
      key: 'partyime.session.key',
      cookieSecret: 'partytime.dev.secret'
    }
  },
  test: {
    db: 'mongodb://localhost/partytime_test',
    root: rootPath,
    notifier: notifier,
    app: {
      name: 'Party Time'
    },
    session: {
      key: 'partyime.session.key',
      cookieSecret: 'partytime.test.secret'
    }
  },
  production: {
    db: 'mongodb://localhost/partytime_prod',
    root: rootPath,
    notifier: notifier,
    app: {
      name: 'Party Time'
    },
    session: {
      key: 'partyime.session.key',
      cookieSecret: 'partytime.prod.secret'
    }
  }
}
