require("dotenv").config();

// creating global variables
var keys = require("./keys");
var Spotify = require("node-spotify-api");
var Twitter = require("twitter");
var command = process.argv[2];
var request = require("request");
var fs = require("fs");

//Constructors
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);


// switch and cases
switch (command) {
  case "my-tweets":
    myTweets();
    break;

  case "spotify-this-song":
    mySpotify();
    break;

  case "movie-this":
    movieThis();
    break;

  case "do-what-it-says":
  doWhatItSays();
  break;

  default:
    console.log("Enter one of the commands: \nmy-tweets\nspotify-this-song \'song title\'\nmovie-this \'movie title\'");
    break;
};


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
        console.log("------------------------------------------------------------------");
        console.log("On " + tweets[i].created_at);
        console.log("You tweeted: " + tweets[i].text);
        console.log("------------------------------------------------------------------");
      }
    } else console.log("There was an error: " + error);
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
      // console.log(firstTrack);
      // console.log(data);
      console.log("------------------------------------------------------------------");
      console.log("Song Title: " + firstTrack.name);
      console.log("Artist: " + firstTrack.artists[0].name);
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
      console.log(
        "------------------------------------------------------------------"
      );
      console.log("Movie Title: " + JSON.parse(body).Title);
      console.log("Year Released: " + JSON.parse(body).Year);
      console.log("The imbd rating is: " + JSON.parse(body).imdbRating);
      console.log("The Rotten Tomatoes rating is: " + JSON.parse(body).Ratings[1].Value);
      console.log("It was produced in: " + JSON.parse(body).Country);
      console.log("Available in these languages: " + JSON.parse(body).Language);
      console.log("The plot: " + JSON.parse(body).Plot);
      console.log("Actors in movie: " + JSON.parse(body).Actors);
      console.log(
        "------------------------------------------------------------------"
      );
    }
  });
}


////// NOT WORKING /////////////
//I want doWhatItSays to read command from random.txt and execute the my-spotify function

//function for do what it says by using random.txt file
// function doWhatItSays() {
//   fs.readFile("random.txt", "utf8", function(error, data){
//       console.log(data);
//       if (error) {
//           return console.log(error);
//       }
//       else{
//           // Then split it by commas (to make it more readable)
//           var dataArr = data.split(",").join;  
//           console.log(dataArr);
//           mySpotify();
        
//       }
//   });
// };


