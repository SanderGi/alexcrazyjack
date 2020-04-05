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

app.get("/sendMove", function (request, response) {
    let id = request.query.id;
    let move = request.query.move;
    db.find({id: id}, function (err, games) { 
      db.update({id: id}, {name : "gibson thunderbird", year: 1990}, {});
    });
});

app.get("/getGame", function (request, response) {
    let id = request.query.id;
    db.find({_id : id}, function (err, games) { 
      response.send(games[0]);
    });
});

app.get("/createGame", function (request, response) {
  let player2 = request.query.name;
  let date = new Date();
  let deck = createDeck(2);
  shuffle(deck);
  let id = date.now()
  db.insert({id: id, status: "invite send", moves: ["-a0", "-a9", "-j0", "-j9"], player1: null, player2: player2, deck1: deck.splice(0,51), deck2: deck, turn: 1, lastUpdated: id});
  response.send(id);
});

app.get("/joinGame", function (request, response) {
    let id = request.query.id;
    let player1 = request.query.name;
    db.find({id: id}, function (err, games) { 
      if (games[0].status !== "invite send") response.send("GAME IS NOT JOINABLE");
      else {
        db.update(games[0], 
            {id: id, status: "playing", moves: ["-a0", "-a9", "-j0", "-j9"], player1: player1, player2: games[0].player2, deck1: games[0].deck1, deck2: games[0].deck2, turn: 1, lastUpdated: date.now}, {}
        );
        response.send(games[0]);
      }
    });
});

const ranks = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A'];
const suits = ['H', 'D', 'S', 'C'];
function createDeck(n) {
  let deck = [];
  for (let k = 0; k < n; k++) {
    for (let i = 0; i < suits.length; i++) {
      for (let j = 0; j < ranks.length; j++) {
        deck.push(ranks[j] + suits[i]);
      }
    }
  }
  
  return deck;
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});