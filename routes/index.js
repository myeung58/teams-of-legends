var ApiRequest = require('../models/ApiRequest.js');
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Team = mongoose.model('Team');
var Match = mongoose.model('Match');

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

router.post('/teams', function(req, res, next) {
  var team = new Team(req.body);

  team.save(function(err, team) {
    if(err){ return next(err); }

    res.json(team);
  });
});

// function resolvedResponse() {

// };

module.exports = router;
