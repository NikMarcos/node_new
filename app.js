const modules = require('/Users/nikita/Desktop/node_new/modules_connection.js');
const app = express();
const config = require('/Users/nikita/Desktop/node_new/config/config.js');
// const checkLang = require('./checkLang.js');
app.use(favicon(path.join(__dirname, 'favicon.ico')));
app.use('/', function (req, res, next) {
  let lang;
  let accept = accepts(req);
  let browserLang = accept.language('ru');
  //req.acceptsLanguages(lang [,'ru'])
  if (browserLang == 'ru') {
    lang = ru_lang;
    app.locals.lang = lang;
    next();
  } else {
    lang = en_lang;
    app.locals.lang = lang;
    next();
  }
});
console.log("fff");
console.log("fff");
const en_lang = require('./locales/en.js');
const ru_lang = require('./locales/ru.js');
const indexRouter = require('./routes/index');
const regRouter = require('./routes/registration');
const userRouter = require('./routes/user');
const usersRouter = require('./routes/users');
const imagesRouter = require('./routes/images');
// Telegram bot connection
// const bot = require('/Users/nikita/Desktop/node_new/telegram_bot.js')();

var store = new MongoStore({
  uri: 'mongodb://localhost:27017/node-new',
  collection: 'nodenewSessions'
});

app.use(session({
  name: 'action',
  secret: 'Vary strange',
  cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 }, // 1 week
  user: {autor: true},
  httpOnly : true,
  store: store,
  secure: false,
  resave: false,
  saveUninitialized: false
}));

app.use(bodyParser.urlencoded({ extended: false }));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressSanitizer());


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(flash());
app.use(function (req, res, next) {
  res.locals.messages = expressMessages(req, res);
  next();
});

app.use('/', function (req, res, next) {
  if (req.session.username && req.session.userlogin) {
    app.locals.regstatus = 'true';
    app.locals.login = req.session.userlogin;
    next();
  } else {
    app.locals.regstatus = 'false';
    next();
  }
});

app.use('/', indexRouter);
app.use('/registration', regRouter);
app.use('/user', userRouter);
app.use('/users', usersRouter);
app.use('/image', imagesRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  //eslint-disable-next-line
  next(createError(404))
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
