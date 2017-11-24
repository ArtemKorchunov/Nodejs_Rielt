var express = require('express');
var http = require('http');
var path = require('path');
var config = require('./config');

var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var errorHandler = require('errorhandler');
var session = require('express-session');
var app = express();
app.set('port', config.get('port'));

var MySQLStore = require('express-mysql-session')(session);
var options = {
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: '',
    database: 'rielt'
};

var sessionStore = new MySQLStore(options);

app.use(session({
    secret: config.get('session:secret'),
    store: sessionStore,
    cookie: config.get('session:cookie'),
    resave: false,
    saveUninitialized: false,
    key: "sid"
}));

var orm  = require('orm');

app.use(orm.express(config.get('mysql:uri'), {
    define: function (db, models, next) {
        models.User = require('./models/user')(db, models, orm.enforce);
        models.User_profile = require('./models/user_profile')(db, models, orm.enforce);

        //db.drop(function () {
            db.sync(function (err) {

            });
        //});
        models.User.find({}, function (err, user) {
            if (!user || user.length === 0){
                models.User_profile.createUser('admin','04061974', function () {}, 5);
                models.User_profile.createUser('user','04061974', function (err) {

                })
            }
        });
        next();
    }
}));


app.engine('ejs', require('ejs-locals'));
app.set('views', path.join(__dirname,'/views'));
app.set('view engine', 'ejs');

app.use(favicon(path.join(__dirname, 'public', 'favicon.png')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(require('./middleware/loadUser.js'));

require('./routes')(app);

app.use(express.static(path.join(__dirname, 'public')));



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

var server = http.createServer(app);
server.listen(config.get('port'), function () {
   console.log('Express server is listening on port ' + config.get('port'));
});

module.exports = app;