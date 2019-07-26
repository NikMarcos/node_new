var express = require('express');
var router = express.Router();
const config = require('/Users/nikita/Desktop/node_new/config/config.js');

router.get('/request',(req, res) => {
  const options = {
    method: 'GET',
    uri: "https://matcher.wavesplatform.com/matcher/orderbook/8LQW8f7P5d5PZM7GtZEBgaqRPGSzS3DfPuiXrURJ4AJS/WAVES/status",
    json: true
  };
  request(options)
  .then((resp) => {
    const collection = req.app.locals.collection;
  //   Object.keys(data).forEach(function(key) {
  // console.table('Key : ' + key + ', Value : ' + data[key])
  // })
      collection.insertOne(resp);
  

    console.log(resp['lastPrice']);
    res.send("jdjd");
  });
});

router.get('/:login', (req, res) => {
  if (req.params.login) {
    let login = req.sanitize(req.params.login);
    let lang = req.app.locals.lang;
    let loginSes = req.app.locals.login;
    const collection = req.app.locals.collection;
    collection.find({login: login}).toArray(function (err, result) {
      req.flash('info', 'Your page');
      res.render('user', { userData: result, navBarData: loginSes, pageData: lang.account, regstatus: req.app.locals.regstatus });
    });
  } else {
    let lang = req.app.locals.lang;
    res.render('index', {pageData: lang.login });
  }
});



router.post('/', (req, res) => {
  let lang = req.app.locals.lang;
  let login = req.sanitize(req.body.login);
  let pass = req.sanitize(req.body.pass);
  try {
      const collection = req.app.locals.collection;
      collection.find({login: login}).toArray(function (err, result) {
        if (err || result.length < 1) {
            req.flash('danger', 'Вы ввели неверный логин или пароль');
            res.redirect('/');
        } else {
          bcrypt.compare(pass, result[0].password, function(err, resultat) {
            if (resultat == true) {
              let login = req.app.locals.login;
              req.session.username = result[0].name;
              req.session.userlogin = result[0].login;
              req.flash('info', 'Your page');
              res.render('user', { userData: result, navBarData: login, pageData: lang.account, regstatus: req.app.locals.regstatus });
            } else {
              req.flash('danger', 'Вы ввели неверный логин или пароль');
              res.redirect('/');
            }
          });
        }
      });
  } catch (err) {
      req.flash('danger', 'Произошла ошибка. Повторите попытку позже');
      res.redirect('/');
  }
});

router.get('/log/out', (req, res) => {
  if(req.session) {
  req.session.destroy(function() {
    res.redirect('/');
  });
  } else {
    res.redirect('/');
  }
});

module.exports = router;
