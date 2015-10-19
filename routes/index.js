var express = require('express');
var router = express.Router();
var User = require('../lib/user');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
  	page: 'welcome',
  	title: 'Express'
  });
});
router.get('/add', function(req, res, next) {
  res.render('add', {
  	page: 'add',
  	title: 'Express'
  });
});
router.get('/register', function(req, res, next) {
  res.render('register', {
  	page: 'welcome',
  	title: 'Express'
  });
});
router.post('/register', function(req, res, next) {
	var user = {
		'username': req.body.username,
		'password': req.body.password
	}
	User.add(user, function(err, user) {
		if (!err) {
		  res.render('index', {
		  	page: 'welcome',
		  	title: 'Express'
		  });
		} else {
			res.send(err);
		}

	})
});
router.get('/home', function(req, res, next) {
  res.render('home', {
  	page: 'home',
  	title: 'Express'
  });
});
router.get('/error', function(req, res, next) {
  res.render('error', {
  	page: 'error',
  	title: 'Express'
  });
});
module.exports = router;
