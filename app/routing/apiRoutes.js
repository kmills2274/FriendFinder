var path = require("path");

// Grab data from friends list in friends.js
var friends = require("../data/friends");

module.exports = function(app) {

  app.get("/api/friends", function(req, res) {
    res.json(friends);
  });

  app.post("/api/friends", function(req, res) {

    // Variable to hold the data of current user's friend match 
    var match = {
      name: "",
      photo: "",
      matchDiff: Infinity
    };

    // Variables storing current user's data & scores
    var currentUser = req.body;
    var userScores = currentUser.scores;

    // Score difference variable
    var scoreDiff;

    // Looping through the friends list
    for (var i = 0; i < friends.length; i++) {
      var friendMatch = friends[i];
      scoreDiff = 0;

      console.log(friendMatch.name);

      // Looping through scores of friends in list
      for (var j = 0; j < friendMatch.scores.length; j++) {
        var friendMatchScores = friendMatch.scores[j];
        var currentUserScores = userScores[j];

        // Calculating the difference between the current user's scores/scores of the friend match's scores and store in the scoreDiff variable
        scoreDiff += Math.abs(parseInt(currentUserScores) - parseInt(friendMatchScores));
      }

      if (scoreDiff <= match.matchDiff) {

        // Reset match to friendMatch
        match.name = friendMatch.name;
        match.photo = friendMatch.photo;
        match.matchDiff = scoreDiff;
      }
    }

    // Push current user data to Friends API
    friends.push(currentUser);

    res.json(match);
  });
};
