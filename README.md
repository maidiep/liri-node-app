# liri-node-app
This app is like SIRI, but instead of speech interpretation, it is a language interpretation. LIRI is a command line node app that takes in parameters and gives back data. 

To retrieve the data that will power this app, you'll need to send requests to the Twitter, Spotify and OMDB APIs. You'll find these Node packages crucial for your assignment.

   * [Twitter](https://www.npmjs.com/package/twitter)
   
   * [Node-Spotify-API](https://www.npmjs.com/package/node-spotify-api)
   
   * [Request](https://www.npmjs.com/package/request)

     * You'll use Request to grab data from the [OMDB API](http://www.omdbapi.com).

   * [DotEnv](https://www.npmjs.com/package/dotenv)

LIRI can take in one of the following commands:

    * my-tweets

    * spotify-this-song "song title" (replace song title with a song of your choice)

    * movie-this "movie title" (replace movie title with a movie title)

    * do-what-it-says
