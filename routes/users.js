var express = require('express');
var router = express.Router();
const config = require('/Users/nikita/Desktop/node_new/config/config.js');

router.get('/', (req, res) => {
  let searchString = req.sanitize(req.query.name);
  let lang = req.app.locals.lang;
  if (req.session.username && req.session.userlogin) {
    let login = req.app.locals.login;
    const collection = req.app.locals.collection;
    if (searchString) {
      collection.find( { login: { $regex: searchString, $options: 'i' } } ).toArray(function (err, result) {
        res.send(result);
      });
    } else {
      collection.find().toArray(function (err, result) {
        res.render('users', { userData: result, navBarData: login, pageData: lang.account, regstatus: req.app.locals.regstatus });
      });
    }
  } else {
    let lang = req.app.locals.lang;
    res.render('index', {pageData: lang.login });
  }
});

module.exports = router;
