var express = require('express');
var router = express.Router();


router.get('/', (req, res) => {
  if (req.session.username && req.session.userlogin){
    res.redirect('/user')
  } else {
    let lang = req.app.locals.lang;
    res.render('index', {pageData: lang.login });
  }
})




/* GET home page. */
// router.get('/', function(req, res, next) {
//   if (req.app.locals.regstatus == 'true') {
//       res.redirect('/user');
//   } else {
//   let lang = req.app.locals.lang;
//   res.render('index', {pageData: lang.login });
// }
// });

module.exports = router;
