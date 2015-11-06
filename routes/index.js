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

  var logMoment = moment(req.body.date);
  var logDate = new Date(req.body.date);
  logDate = logDate.toUTCString();

  // prepare log data
  var log = {
    'user': req.user._id,
    'date': {
      'iso': logDate,
      'unix': new Date(req.body.date).getTime(),
      'moment': logMoment,
      'second': logMoment.seconds(),
      'minute': logMoment.minutes(),
      'hour': logMoment.hours(),
      'dateOfMonth': logMoment.date(),
      'dayOfWeek': logMoment.day(),
      'dayOfWeekLocale': logMoment.weekday(),
      'dayOfWeekIso': logMoment.isoWeekday(),
      'dayOfYear': logMoment.dayOfYear(),
      'weekOfYear': logMoment.week(),
      'weekOfYearIso': logMoment.isoWeek(),
      'month': logMoment.month(),
      'quarter': logMoment.quarter(),
      'year': logMoment.year()
    },
    'reqData': {
      'ip': req.ipv4,
      'ipv6': req.ipv6,
      'geo': req.geo,
      'secure': req.secure,
      'xhr': req.xhr
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
  var bornMoment = moment(req.body.born);
  var bornDate = new Date(req.body.born);
  bornDate = bornDate.toUTCString();

  var user = {
    'name': req.body.name,
    'lastName': req.body.lastname,
    'email': req.body.email,
    'username': req.body.username,
    'password': req.body.password,
    'born': {
      'iso': bornDate,
      'unix': new Date(req.body.born).getTime(),
      'moment': bornMoment,
      'second': bornMoment.seconds(),
      'minute': bornMoment.minutes(),
      'hour': bornMoment.hours(),
      'dateOfMonth': bornMoment.date(),
      'dayOfWeek': bornMoment.day(),
      'dayOfWeekLocale': bornMoment.weekday(),
      'dayOfWeekIso': bornMoment.isoWeekday(),
      'dayOfYear': bornMoment.dayOfYear(),
      'weekOfYear': bornMoment.week(),
      'weekOfYearIso': bornMoment.isoWeek(),
      'month': bornMoment.month(),
      'quarter': bornMoment.quarter(),
      'year': bornMoment.year()
    },
    'dateAdded': Date.now(),
    'reqData': {
      'ip': req.ipv4,
      'ipv6': req.ipv6,
      'geo': req.geo,
      'secure': req.secure,
      'xhr': req.xhr
    }
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
  console.log(req.user);
  lt.getAllLogs(user, function(err, logs) {
    if (err) res.send(err);

    res.render('home', {
      page: 'home',
      title: 'Express',
      logs: logs,
      name: req.user.name,
      lastName: req.user.lastName,
      born: req.user.born
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
