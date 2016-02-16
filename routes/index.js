var ApiRequest = require('../models/ApiRequest.js');
var express = require('express');
var router = express.Router();
var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var jwt = require('express-jwt');
// userProperty specifies which property on req to put our payload from our tokens
var auth = jwt({secret: process.env.SSH_KEY, userProperty: 'data'});

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/teams', function(req, res, next) {
  Team.find(function(err, teams){
    if(err){ return next(err); }

    res.json(teams);
  });
});


router.get('/summoners/by-name', function(req, res) {
  var summonerName = req.query.name,
    summonerUrl = 'https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/' + summonerName + '?api_key=' + process.env.LOL_API_KEY,
    promise = ApiRequest.get(summonerUrl);

  promise.then(function(summonerData){
    res.json(summonerData);
  }, function() {
    res.json({});
  });
});

router.get('/summoners/by-ids', function(req, res) {
  var ids = req.query.ids,
    url = 'https://na.api.pvp.net/api/lol/na/v1.4/summoner/' + ids + '?api_key=' + process.env.LOL_API_KEY,
    promise = ApiRequest.get(url);

  promise.then(function(summonersData) {
    res.json(summonersData);
  }, function() {
    res.json({});
  });
});

router.get('/teams/by-summoner', function(req, res) {
  var summonerId = req.query.id,
    url = 'https://na.api.pvp.net/api/lol/na/v2.4/team/by-summoner/' + summonerId + '?api_key=' + process.env.LOL_API_KEY,
    promise = ApiRequest.get(url);

  promise.then(function(teamData) {
    res.json(teamData);
  }, function() {
    res.json({});
  });
});

router.post('/signup', function(req, res, next) {
  var emailPattern = /[A-Z0-9.]+@[A-Z0-9.]+.[A-Z]/i,
    user;

  if(!req.body.username || !req.body.password) {
    return res.status(400).json({ message: 'Please fill out all fields' });
  }

  if (!emailPattern.test(req.body.username)) {
    return res.status(400).json({ message: 'Please enter valid email' });
  }

  user = new User();
  user.username = req.body.username;
  user.setPassword(req.body.password);
  user.save(function (err) {
    if (err) {
      if (err.toJSON().code === 11000) {
        return res.status(400).json({ message: 'Username is already taken'});
      }
      return next(err);
    }
    return res.json({token: user.generateJWT()});
  });
});

router.post('/signin', function(req, res, next) {
  if (!req.body.username || !req.body.password) {
    return res.status(400).json({ message: 'Please fill out all fields' });
  }

  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err); }

    if (user) {
      return res.json({token: user.generateJWT()});
    } else {
      return res.status(401).json(info);
    }
  })(req, res, next);
});

module.exports = router;
