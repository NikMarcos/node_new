var express = require('express');
var router = express.Router();
const config = require('/Users/nikita/Desktop/node_new/config/config.js');

/* GET registration form */
router.get('/', function(req, res, next) {
  let lang = req.app.locals.lang;
  res.render('registration', { pageData: lang.registration });
});

/* POST receive and save registration data */
router.post('/new', (req, res) => {
    let name = req.sanitize(req.body.name);
    let login = req.sanitize(req.body.login);
    let pass = req.sanitize(req.body.pass);
    let confpass = req.sanitize(req.body.confpass);
    if (pass == confpass) {
    try {
      const collection = req.app.locals.collection;
      bcrypt.hash(pass, null, null, function(err, hash) {
        collection.insertOne({ name: name, login: login, password: hash });
      });
         // router.post('/new', upl, function (req, res) {
         // req.file.filename
         // db.collection(config.database.collection).updateOne( { name: name}, { $push: { 'imgname': req.file.filename }});
    } catch (err) {
         console.log(err);
      }
  req.flash('info', 'Insert');
  res.redirect('/');
} else {
  req.flash('info', 'You enter the wrong password');
  res.render('registration', { pageData: lang.registration });
}
});

module.exports = router;
