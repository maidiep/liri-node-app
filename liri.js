require("dotenv").config();

// creating global variables
var keys = require("./keys");
var Spotify = require("node-spotify-api");
var Twitter = require("twitter");
var command = process.argv[2];
var request = require("request");

//Constructors
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

// switch and cases
switch (command) {
  case "spotify-this-song":
    mySpotify();
    break;

  case "my-tweets":
    myTweets();
    break;

  case "movie-this":
    movieThis();
    break;

  default:
    console.log("error");
    break;
}
// Twitter function to grab tweets
function myTweets() {
  var params = { screen_name: "devShortStack" };
  client.get("statuses/user_timeline", params, function(
    error,
    tweets,
    response
  ) {
    if (!error) {
      for (var i = 0; i < tweets.length; i++) {
        console.log("On " + tweets[i].created_at);
        console.log("You tweeted: " + tweets[i].text);
        console.log("------------------------------------------------------------------");
      }
    } else console.log("There was an error" + error);
  });
}

//execute this funtion when command is my-tweets
// if (command === "my-tweets") {
//   myTweets();
// }

//function to grab songs info from Spotify
// need to disply artist, song title, preview link of song, and album song is from
function mySpotify() {
  var songTitle = process.argv[3];
  spotify.search(
    { type: "track", query: songTitle || "All the Small Things", limit: 5 },
    function(err, data) {
      if (err) {
        return console.log("Error occurred: " + err);
      }
      var firstTrack = data.tracks.items[0];
      // console.log(data);
      console.log(firstTrack.external_urls.spotify);
      console.log(firstTrack.name);
      console.log(firstTrack.artists[0].name);
      console.log(firstTrack.album.name);
    }
  );
}

// if (command === "my-spotify") {
//   mySpotify();
// }

// Grab the movieName which will always be the third node argument.
function movieThis() {
  var movieName = process.argv[3] || "Mr. Nobody";

  // Then run a request to the OMDB API with the movie specified
  var queryUrl =
    "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
  // request from IMDB
  request(queryUrl, function(error, response, body) {
    // If the request is successful
    if (!error && response.statusCode === 200) {
      // Parse the body of the site and recover just the imdbRating
      // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
      console.log("Release Year: " + JSON.parse(body).Year);
      console.log("The movie's rating is: " + JSON.parse(body).imdbRating);
    }
  });
}
