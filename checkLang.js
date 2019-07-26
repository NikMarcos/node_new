// const accepts = require('accepts');
let lang;
function checkLang (req, res, next) {
  let accept = accepts(req);
  let browserLang = accept.language('ru');
  //req.acceptsLanguages(lang [,'ru'])
if (browserLang == 'ru') {
    lang = rusLang;
    next();
  } else {
    lang = engLang;
    next();
  }
};
module.exports = checkLang();
