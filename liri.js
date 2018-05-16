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


//function to grab top search from Spotify
//need to disply artist, song title, preview link of song, and album song is from
function mySpotify() {
  var songTitle = process.argv[3];
  
  // code came from https://www.npmjs.com/package/node-spotify-api
  spotify.search(
    { type: "track", query: songTitle || "All the Small Things", limit: 5 },
    function(err, data) {
      if (err) {
        return console.log("Error occurred: " + err);
      }

      var firstTrack = data.tracks.items[0];
      // console.log(data);
      console.log("Artist: " + firstTrack.artists[0].name);
      console.log("Song Title: " + firstTrack.name);
      console.log("From album: " + firstTrack.album.name);
      console.log("Song Preview: " + firstTrack.external_urls.spotify);
      console.log("------------------------------------------------------------------");
    }
  );
}

//function to access imbd api
//Grab the movieName which will always be the third node argument.
//Need to display: title, year, imbdRating, RottenTomato Rating, country produced, language, plot, actors
function movieThis() {
  // if no movie is specified, it will default to Mr. Nobody
  var movieName = process.argv[3] || "Mr. Nobody";

  // Then run a request to the OMDB API with the movie specified
  var queryUrl =
    "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
  // request from IMDB
  request(queryUrl, function(error, response, body) {
    // If the request is successful
    if (!error && response.statusCode === 200) {
      // Parse the body of the site 
      console.log("Movie Title: " + JSON.parse(body).Title);
      console.log("Year Released: " + JSON.parse(body).Year);
      console.log("The imbd rating is: " + JSON.parse(body).imdbRating);
      console.log("The Rotten Tomatoes rating is: " + JSON.parse(body).Ratings[1].Value);
    }
  });
}
