var express = require('express');
var router = express.Router();
const config = require('/Users/nikita/Desktop/node_new/config/config.js');

const storage = multer.diskStorage({
  destination:'/Users/nikita/Desktop/node_new/public/uploads',
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() +  path.extname(file.originalname));
  }
});

const upl = multer({
  storage: storage,
  limits:{fileSize: 100000000}
}).single('image');

router.post('/loadimage', function (req, res, next) {
    upl(req, res, function (err) {
      if (req.file) {
        if (err) {
          req.flash('danger', "Произошел сбой. Пожалуйста, попробуйте загрузить изображение еще раз.");
          res.redirect('/user');
        } else {
          const collection = req.app.locals.collection;
          collection.updateOne(
            { login : req.session.userlogin},
            { $push: { 'imgname': req.file.filename } }
          );
            req.flash('primary', "Изображение добавленно на страницу");
            res.redirect('/user');
        }
      } else {
        req.flash('danger', "Вы забыли выбрать изображение.");
        res.redirect('/user');
      }
    });
});

router.get('/deleteImage/:name', function (req, res, next) {
  let delImgname = req.params.name;
  fs.stat(`/Users/nikita/Desktop/node_new/public/uploads/${delImgname}`, function (err, stats) {
      const collection = req.app.locals.collection;
      if (stats) {
        fs.unlink(`/Users/nikita/Desktop/my_project/public/uploads/${delImgname}`,function(err){
           if(err) return console.log(err);
        });
        collection.updateOne({"login":req.session.userlogin}, {'$pull': {"imgname": delImgname}});
      } else {
        collection.updateOne({"login":req.session.userlogin}, {'$pull': {"imgname": delImgname}});
      }
    req.flash("danger", "Изображение удалено");
    res.redirect('/user');
  });
});
module.exports = router;

// MongoClient.connect(url, { useNewUrlParser: true }, function(err, client) {
//  const db = client.db("my_project");
//  try {
//    db.restaurant.updateOne(
//          { "pair" : pair },
//          { $set: {"_id" : 4, "violations" : 7, "borough" : "Manhattan" } },
//          { upsert: true }
//    );
// } catch (e) {
// print(e);
// }
//  client.close();
// });
