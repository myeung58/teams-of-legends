var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');

var MatchSchema = new mongoose.Schema({
  gameMode: String,
  mapId: Number,
  assists: Number,
  opposingTeamName: String,
  invalid: Boolean,
  deaths: Number,
  gameId: Number,
  kills: Number,
  win: Boolean,
  date: Number,
  opposingTeamKills: Number,
  team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' }
});

MatchSchema.plugin(timestamps);
mongoose.model('Match', MatchSchema);

var Match = mongoose.model('Match', MatchSchema);