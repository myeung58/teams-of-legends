var ApiRequest = require('../models/ApiRequest.js');
var express = require('express');
var router = express.Router();
var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var jwt = require('express-jwt');
// userProperty specifies which property on req to put our payload from our tokens
var auth = jwt({secret: process.env.SSH_KEY, userProperty: 'data'});

// router.param('team', function(req, res, next, id) {
//   var query = Team.findById(id);

//   query.exec(function (err, team){
//     if (err) { return next(err); }
//     if (!team) { return next(new Error('can\'t find team')); }

//     req.team = team;
//     return next();
//   });
// });

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/teams', function(req, res, next) {
  Team.find(function(err, teams){
    if(err){ return next(err); }

    res.json(teams);
  });
});

// router.get('/teams/:team', function(req, res) {
//   res.json(req.team);
// });

router.get('/summoners/by-name', function(req, res) {
  console.log('request body: ', req.query);
  var summonerName = req.query.name;
  // query for summoner, if exists, get api_id, if not, get from api
  var summonerUrl = 'https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/' + summonerName + '?api_key=' + process.env.LOL_API_KEY;
  console.log('summoner url', summonerUrl);
  var p = ApiRequest.get(summonerUrl);
  console.log('p: ', p);
  p.then(function(summonerData){
    console.log('inside summoner then');
    console.log(summonerData[summonerName].id);
    res.json(summonerData);
  }, function() {
    res.json({});
  });
});

router.get('/summoners/by-ids', function(req, res) {
  console.log('request.body: ', req.query);
  var ids = req.query.ids;
  var url = 'https://na.api.pvp.net/api/lol/na/v1.4/summoner/' + ids + '?api_key=' + process.env.LOL_API_KEY;
  var p = ApiRequest.get(url);
  p.then(function(summonersData) {
    console.log('inside summoners then');
    console.log(summonersData);
    res.json(summonersData);
  }, function() {
    res.json({});
  });
});

router.get('/teams/by-summoner', function(req, res) {
  console.log('request body: ', req.query);
  var summonerId = req.query.id;

  var url = 'https://na.api.pvp.net/api/lol/na/v2.4/team/by-summoner/' + summonerId + '?api_key=' + process.env.LOL_API_KEY;
  var p = ApiRequest.get(url);
  p.then(function(teamData) {
    console.log('inside team then');
    res.json(teamData);
  }, function() {
    res.json({});
  });
});

router.post('/signup', function(req, res, next) {
  // add password confirmation
  console.log('request body: ', req.body);
  if(!req.body.username || !req.body.password) {
    return res.status(400).json({ message: 'Please fill out all fields' });
  }
  var emailPattern = /[A-Z0-9.]+@[A-Z0-9.]+.[A-Z]/i;
  if (!emailPattern.test(req.body.username)) {
    return res.status(400).json({ message: 'Please enter valid email' });
  }

  var user = new User();

  user.username = req.body.username;
  user.setPassword(req.body.password);
  console.log('about to save user as: ', user);
  user.save(function (err) {
    console.log(err);
    if (err) {
      if (err.toJSON().code === 11000) {
        return res.status(400).json({ message: 'Username is already taken'});
      }
      return next(err);
    }
    console.log('about to respond');
    return res.json({token: user.generateJWT()});
  });
});

router.post('/signin', function(req, res, next) {
  if (!req.body.username || !req.body.password) {
    return res.status(400).json({ message: 'Please fill out all fields' });
  }

  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err); }
    console.log('authing user: ', user);
    if (user) {
      return res.json({token: user.generateJWT()});
    } else {
      return res.status(401).json(info);
    }
  })(req, res, next);
});

module.exports = router;
