var express = require('express');
var router = express.Router();
var User = require('../lib/user');
var lt = require('../lib/lt.js');
var moment = require('moment');

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
router.post('/add', function(req, res, next) {

  var logDate = moment(req.body.date);

  // prepare log data
  var log = {
    'user': req.user._id,
    'date': {
      'iso': new Date(req.body.date),
      'unix': new Date(req.body.date).getTime(),
      'moment': logDate,
      'second': logDate.seconds(),
      'minute': logDate.minutes(),
      'hour': logDate.hours(),
      'dateOfMonth': logDate.date(),
      'dayOfWeek': logDate.day(),
      'dayOfWeekLocale': logDate.weekday(),
      'dayOfWeekIso': logDate.isoWeekday(),
      'dayOfYear': logDate.dayOfYear(),
      'weekOfYear': logDate.week(),
      'weekOfYearIso': logDate.isoWeek(),
      'month': logDate.month(),
      'quarter': logDate.quarter(),
      'year': logDate.year()
    },
    'dateAdded': Date.now(),
    'log': req.body.logcontent,
    'labels': req.body.labels.split(' ')
  }

  // Add log
  lt.quickAdd(log, function(err, newLog) {
    if (err) res.send(err);

    // Cb ok, render new log ++++TODO: render newLog page
    res.redirect('/home');
  })
});

router.get('/register', function(req, res, next) {
  res.render('register', {
  	page: 'welcome',
  	title: 'Express'
  });
});
router.post('/register', function(req, res, next) {
  // Get user input
	var user = {
		'username': req.body.username,
		'password': req.body.password
	}

  // Add user
	User.add(user, function(err, user) {
		if (!err) {
		  res.redirect('/home');
		} else {
			res.send(err);
		}

	})
});

router.get('/home', function(req, res, next) {

  // Get user's logs
  var user = req.user._id;
  lt.getAllLogs(user, function(err, logs) {
    if (err) res.send(err);

    console.log(logs);

    res.render('home', {
    	page: 'home',
    	title: 'Express',
      logs: logs
    });
  });

});
router.get('/error', function(req, res, next) {
  res.render('error', {
  	page: 'error',
  	title: 'Express'
  });
});
module.exports = router;
