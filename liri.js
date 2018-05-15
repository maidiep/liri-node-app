require("dotenv").config();

var keys = require("./keys")
var Spotify = require ("node-spotify-api");
var Twitter = require ("twitter");

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var params = {screen_name: 'devShortStack'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    console.log(tweets);
  }
});