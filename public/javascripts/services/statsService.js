app.service('StatsService', function ($http) {
  _this = this;
  this.test = '123';

  this.getRoster = function(roster, callback) {
    if (!roster.memberList.length) { return; }

    var url = '/summoners/by-ids?ids=' + this.idsStringFrom(roster.memberList),
      members;

    console.log('url: ', url);
    $http.get(url)
      .then(function(response) {
        console.log('success response from backend');
        console.log(response.data);
        if (Object.keys(response.data).length) {
          members = response.data;
          for(var id in members) {
            members[id].externalProfileUrl = _this.rosterMemberUrl(members[id]);
          }
          callback(members);
        } else {
          callback();
        }
      });

  };

  this.idsStringFrom = function(memberList) {
    var idsString;

    memberList.forEach(function(member) {
      // ids.push(member.playerId);
      if (idsString) {
        idsString += ',' + member.playerId;
      } else {
        idsString = member.playerId.toString();
      }
    });

    return idsString;
  };

  this.rosterMemberUrl = function(member) {
    return 'http://na.op.gg/summoner/userName=' + member.name;
  };
});
