'use strict'; 

var app = require('express')();
var path = require('path');
var session = require('express-session');
var User = require('../api/users/user.model');
var bodyParser = require('body-parser')


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(session({
    // this mandatory configuration ensures that session IDs are not predictable
    secret: 'tongiscool',
    cookie:{maxAge:100000}
}));

app.use(function (req, res, next) {
  if (!req.session.counter) req.session.counter = 0;
  console.log('counter', ++req.session.counter);
  next();
});

app.use(function (req, res, next) {
    console.log('session', req.session);
    next();
});

app.post('/signup', function (req, res, next) {
   console.log('server', req.body)
    User.create({
        email: req.body.email,
        password: req.body.pwd
    })
    .then(function (user) {
        req.session.userId = user._id;
        res.status(201).json(user);
    })
    .then(null, next);
});


app.post('/login', function (req, res, next) {
   //console.log('server', req.body)
    User.findOne({
        email: req.body.email,
        password: req.body.pwd
    })
    .exec()
    .then(function (user) {
        if (!user) {
            res.sendStatus(401);
        } else {
            req.session.userId = user._id;
            res.sendStatus(200);
        }
    })
    .then(null, next);
});

app.delete('/logout',function(req,res,next){
    console.log('req',req);
    console.log("req.session",req.session);

    req.session.destroy(function(response,err){
        if(err) console.log(err);
        else res.send(response)
    });
})


app.get('')




app.use(require('./logging.middleware'));

app.use(require('./requestState.middleware'));

app.use(require('./statics.middleware'));

app.use('/api', require('../api/api.router'));

var validFrontendRoutes = ['/', '/stories', '/users', '/stories/:id', '/users/:id', '/signup', '/login'];
var indexPath = path.join(__dirname, '..', '..', 'public', 'index.html');
validFrontendRoutes.forEach(function (stateRoute) {
	app.get(stateRoute, function (req, res) {
		res.sendFile(indexPath);
	});
});

app.use(require('./error.middleware'));


module.exports = app;