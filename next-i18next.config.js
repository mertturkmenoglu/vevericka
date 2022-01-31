const path = require('path');

module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es', 'tr'],
    localePath: path.resolve('./public/static/locales')
  },
};