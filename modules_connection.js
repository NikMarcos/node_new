module.exports = 
                 createError = require('http-errors');
                 express = require('express');
                 favicon = require('serve-favicon');
                 path = require('path');
                 cookieParser = require('cookie-parser');
                 logger = require('morgan');
                 bodyParser = require("body-parser");
                 flash = require('connect-flash');
                 session = require('express-session');
                 MongoClient = require('mongodb').MongoClient;
                 MongoStore = require('connect-mongodb-session')(session);
                 expressMessages = require('express-messages');
                 expressSanitizer = require('express-sanitizer');
                 multer = require('multer');
                 accepts = require('accepts');
                 bcrypt = require('bcrypt-nodejs');
                 fs = require('fs');
                 request = require('request-promise');
                 // const { body } = require('express-validator/check');
                 // const { sanitizeBody } = require('express-validator/filter');
