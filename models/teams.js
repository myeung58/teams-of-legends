var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');

var TeamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  formDate: { type: Number, required: true },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  matches: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Match' }],
  roster: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Member'}],
  stats: {}
});

TeamSchema.plugin(timestamps);
mongoose.model('Team', TeamSchema);

var Team = mongoose.model('Team', TeamSchema);
