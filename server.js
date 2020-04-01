// server.js
// where your node app starts

// init project
const express = require("express");
const app = express();

// setup database
const Datastore = require('nedb');
const db = new Datastore({ filename: 'games', autoload: true });
db.count({}, function (err, count) {
  console.log("There are " + count + " entries in the database");
  if(err) console.log("There's a problem with the database: ", err);
  // else if (count <= 0) {
  //   db.insert({moves: "ILovePancakes"});
  // }
});

// make all the files in 'public' available
app.use(express.static("public"));
// use json
app.use(express.json({ limit: "10kb" }));

// https://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
    response.sendFile(__dirname + "/public/index.html");
});

app.post("/sendMove", function (request, response) {
    response.sendStatus(200);
});

app.get("/getGame", function (request, response) {
    let id = request.query.id;
    db.find({_id : id}, function (err, games) { 
      response.send(games[0]);
    });
});

app.get("/createGame", function (request, response) {
    let player2 = request.query.name;
  response.sendStatus(200);
});

app.get("/joinGame", function (request, response) {
    let id = request.query.id;
    response.sendStatus(200);
});

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});