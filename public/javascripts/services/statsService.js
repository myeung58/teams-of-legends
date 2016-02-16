app.service('StatsService', function ($http) {
  _this = this;
  this.maps = {
    1: 'SummonersRift',
    8: 'CrystalScar',
    9: 'WIPUpdate',
    10: 'NewTwistedTreeline',
    11: 'SummonersRiftNew',
    12: 'ProvingGroundsNew'
  };
  this.urls = {
    getRoster: '/summoners/by-ids?ids=',
    rosterMember: 'http://na.op.gg/summoner/userName='
  };

  this.getRoster = function(roster, callback) {
    if (!roster.memberList.length) { return; }

    var url = this.urls.getRoster + this.idsStringFrom(roster.memberList),
      members;

    $http.get(url)
      .then(function(response) {
        if (Object.keys(response.data).length) {
          members = response.data;
          for(var id in members) {
            members[id].externalProfileUrl = _this.urls.rosterMember + members[id].name;
          }
          callback(members);
        } else {
          callback();
        }
      });

  };

  this.compileHistorySummary = function(matchHistory, callback) {
    if (!matchHistory.length) { return; }

    var historySummary = { matchHistory: matchHistory },
      totalKills = 0,
      totalAssists = 0,
      totalDeaths = 0,
      matchesPlayed = matchHistory.length;

    matchHistory.forEach(function(match) {
      var fullDate = new Date(match.date),
        dateComponents = fullDate.toString().split(' ');

      match.date = [dateComponents[1], dateComponents[2], dateComponents[3]].join(' ');
      match.map = _this.maps[match.mapId];

      if (match.kills) { totalKills += match.kills; }
      if (match.assists) { totalAssists += match.assists; }
      if (match.deaths) { totalDeaths += match.deaths; }
    });

    historySummary.totalKills = totalKills;
    historySummary.totalAssists = totalAssists;
    historySummary.totalDeaths = totalDeaths;
    historySummary.averageKills = (totalKills / matchesPlayed).toFixed(2);
    historySummary.averageAssists = (totalAssists / matchesPlayed).toFixed(2);
    historySummary.averageDeaths = (totalDeaths / matchesPlayed).toFixed(2);

    callback(historySummary);
  };

  this.idsStringFrom = function(memberList) {
    var idsString;

    memberList.forEach(function(member) {
      if (idsString) {
        idsString += ',' + member.playerId;
      } else {
        idsString = member.playerId.toString();
      }
    });

    return idsString;
  };
});
