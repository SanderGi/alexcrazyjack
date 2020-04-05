// fetch("/getGame?id=8xqxlGnqYR94h6jz").then(async res => {
//   console.log(await res.json());
// });
let username = "Harry Potter";
let games = getGames();
let curGame = null;

const alpha = "abcdefghij";
const blueChip = "https://cdn.glitch.com/1326284a-347b-4933-910c-d4ec316eaaa4%2FbluePoker.png?v=1586039897104";
const redChip = "https://cdn.glitch.com/1326284a-347b-4933-910c-d4ec316eaaa4%2FredPoker.png?v=1586039897300";
const blackChip = "https://cdn.glitch.com/1326284a-347b-4933-910c-d4ec316eaaa4%2FbackPoker.png?v=1586039897127";

let index = 0;
CreateBoard();

document.getElementById("leave").addEventListener("touchstart", (e) => {
  document.getElementById("chips").innerHTML = "";
  document.getElementById("game").style = "display: none; text-align: center; position: fixed; top: 0px; width: 100%";
  document.getElementById("menu").style = "display: block";
});

function enterGame(n) {
  curGame = games[n];
  document.getElementById("menu").style = "display: none";
  drawChips(curGame.moves);
  document.getElementById("name").innerHTML = username + " <strong>vs. " + curGame.opponent;
  document.getElementById("game").style = "display: block; text-align: center; position: fixed; top: 0px; width: 100%";
  ShowHand(curGame.hand);
}

function getGames() {
  let stuff = [{id: "ldjhalwidh", moves: ["-a0", "-a9", "-j0", "-j9"], player: 1, opponent: "TestGame", hand: ['KS', 'KH', 'KD', 'KC', 'AS'], turn: 1, lastUpdated: 1921802129}];
  let pturn = document.getElementById("yourTurn");
  let oturn = document.getElementById("theirTurn");
  for (let i = 0; i < stuff.length; i++) {
    let n = i;
    let element = document.createElement("div");
    element.className = "frostedGlass";
    element.style = "margin: 0.2em; padding: 0.4em; clear: both;"
    element.innerHTML = '<h1 style="font-size: 1.5em">' + stuff[i].opponent + '</h1>';
    element.addEventListener("touchstart", (e) => { enterGame(n); });
    if (stuff[i].turn == stuff[i].player) pturn.appendChild(element);
    else oturn.appendChild(element);
  }
  return stuff;
}

function MakeMove(rank, suit, index) {
  let col = index % 10;
  let row = Math.floor(index / 10);
  let card = rank.toString() + suit.charAt(0);
  card = card.toUpperCase();
  if (curGame.player != curGame.turn || !curGame.hand.includes(card)) return;
  curGame.turn = "nope";
  curGame.hand.splice(curGame.hand.indexOf(card), 1);
  let move = (curGame.player == 1 ? 'x' : 'o') + alpha[row] + col;
  placeChip(move);
  saveMove(move).then((newCard) => {
    curGame.hand.push(newCard);
    ShowHand(curGame.hand);
  });
}

function ShowHand(hand) {
  let markup = '';
  for (let i = 0; i < hand.length; i++) {
    let parts = hand[i].split("");
    if (parts.length < 2) continue;
    let suit = parts[1] == 'S' ? 'spades' : parts[1] == 'H' ? 'hearts' : parts[1] == 'D' ? 'diams' : 'clubs';
    markup += '<a class="card rank-'+parts[0].toLowerCase()+' '+suit+'" style="margin-top: 0.4em;"><span class="rank">'+parts[0]+'</span><span class="suit">&'+suit+';</span></a>';
  }
  document.getElementById("hand").innerHTML = markup;
}

async function saveMove(move) {
  fetch("/makeMoveAndGetCard?id="+curGame.id+"&move="+move).then(async res => {
    return await res.json();
  });
}

function drawChips(moves) {
  for (let i = 0; i < moves.length; i++) {
    placeChip(moves[i]);
  }
}

function placeChip(move) {
  var parts = move.split("");
  let chip = document.createElement('img');
  chip.src = parts[0] == '-' ? blackChip : parts[0] == 'x' ? redChip : blueChip;
  chip.style = "width: 10%; position: absolute; z-index: 100; top: " + alpha.indexOf(parts[1]) * 10 + "%; left: " + parseInt(parts[2]) * 10 + "%;";
  document.getElementById("chips").appendChild(chip);
}

function resizeBoard() {
  let width = (window.innerHeight > window.innerWidth) ? "100%" : "calc(100vh - 14em)";
  document.getElementById("board").style = "position:relative; width: " + width + "; height: calc(100vh - 14em); margin: auto; " + (width === "100%" ? "border: none" : "border-left: solid; border-right: solid;");
  // document.getElementById("name").innerHTML = width;
  if (window.innerHeight > window.innerWidth) document.getElementById("cardCanvas").className = "playingCards " + (window.innerWidth > 200 ? "faceImages" : "simpleCards");
  else document.getElementById("cardCanvas").className = "playingCards " + (window.windowHeight > 200 ? "faceImages" : "simpleCards");
}
resizeBoard();
window.onresize = function() { resizeBoard(); };

function CreateBoard() {
  let board = document.getElementById("board");
  board.appendChild(createCard("big", "joker"));
  for (let i = 10; i >= 7; i--) board.appendChild(createCard(i, "diams"));
  for (let i = 7; i <= 10; i++) board.appendChild(createCard(i, "spades"));
  board.appendChild(createCard("", "joker"));
  //
  board.appendChild(createCard(10, "clubs"));
  board.appendChild(createCard("K", "clubs"));
  for (let i = 6; i >= 4; i--) board.appendChild(createCard(i, "diams"));
  for (let i = 4; i <= 6; i++) board.appendChild(createCard(i, "spades"));
  board.appendChild(createCard("K", "hearts"));
  board.appendChild(createCard(10, "hearts"));
  //
  board.appendChild(createCard(9, "clubs"));
  board.appendChild(createCard(6, "clubs"));
  board.appendChild(createCard("Q", "clubs"));
  for (let i = 3; i >= 2; i--) board.appendChild(createCard(i, "diams"));
  for (let i = 2; i <= 3; i++) board.appendChild(createCard(i, "spades"));
  board.appendChild(createCard("Q", "hearts"));
  board.appendChild(createCard(6, "hearts"));
  board.appendChild(createCard(9, "hearts"));
  //
  board.appendChild(createCard(8, "clubs"));
  board.appendChild(createCard(5, "clubs"));
  board.appendChild(createCard(3, "clubs"));
  board.appendChild(createCard("Q", "diams"));
  board.appendChild(createCard("A", "diams"));
  board.appendChild(createCard("A", "spades"));
  board.appendChild(createCard("Q", "spades"));
  board.appendChild(createCard(3, "hearts"));
  board.appendChild(createCard(5, "hearts"));
  board.appendChild(createCard(8, "hearts"));
  //
  board.appendChild(createCard(7, "clubs"));
  board.appendChild(createCard(4, "clubs"));
  board.appendChild(createCard(2, "clubs"));
  board.appendChild(createCard("A", "clubs"));
  board.appendChild(createCard("K", "diams"));
  board.appendChild(createCard("K", "spades"));
  board.appendChild(createCard("A", "hearts"));
  board.appendChild(createCard(2, "hearts"));
  board.appendChild(createCard(4, "hearts"));
  board.appendChild(createCard(7, "hearts"));
  //
  board.appendChild(createCard(7, "hearts"));
  board.appendChild(createCard(4, "hearts"));
  board.appendChild(createCard(2, "hearts"));
  board.appendChild(createCard("A", "hearts"));
  board.appendChild(createCard("K", "spades"));
  board.appendChild(createCard("K", "diams"));
  board.appendChild(createCard("A", "clubs"));
  board.appendChild(createCard(2, "clubs"));
  board.appendChild(createCard(4, "clubs"));
  board.appendChild(createCard(7, "clubs"));
  //
  board.appendChild(createCard(8, "hearts"));
  board.appendChild(createCard(5, "hearts"));
  board.appendChild(createCard(3, "hearts"));
  board.appendChild(createCard("Q", "spades"));
  board.appendChild(createCard("A", "spades"));
  board.appendChild(createCard("A", "diams"));
  board.appendChild(createCard("Q", "diams"));
  board.appendChild(createCard(3, "clubs"));
  board.appendChild(createCard(5, "clubs"));
  board.appendChild(createCard(8, "clubs"));
  //
  board.appendChild(createCard(9, "hearts"));
  board.appendChild(createCard(6, "hearts"));
  board.appendChild(createCard("Q", "hearts"));
  for (let i = 3; i >= 2; i--) board.appendChild(createCard(i, "spades"));
  for (let i = 2; i <= 3; i++) board.appendChild(createCard(i, "diams"));
  board.appendChild(createCard("Q", "clubs"));
  board.appendChild(createCard(6, "clubs"));
  board.appendChild(createCard(9, "clubs"));
  //
  board.appendChild(createCard(10, "hearts"));
  board.appendChild(createCard("K", "hearts"));
  for (let i = 6; i >= 4; i--) board.appendChild(createCard(i, "spades"));
  for (let i = 4; i <= 6; i++) board.appendChild(createCard(i, "diams"));
  board.appendChild(createCard("K", "clubs"));
  board.appendChild(createCard(10, "clubs"));
  //
  board.appendChild(createCard("", "joker"));
  for (let i = 10; i >= 7; i--) board.appendChild(createCard(i, "spades"));
  for (let i = 7; i <= 10; i++) board.appendChild(createCard(i, "diams"));
  board.appendChild(createCard("big", "joker"));
}

function createCard(rank, suit) {
  let card = document.createElement('div');
  card.style = "width: 10%; height: 10%; overflow: hidden; margin: 0; padding: 0; float: left";
  if (suit == "joker") card.innerHTML = '<div class="card joker '+rank+'"><span class="rank"></span><span class="suit">Joker</span></div>';
  else card.innerHTML = '<div class="card rank-' + rank.toString().toLowerCase() + ' ' + suit + '"><span class="rank">'+rank+'</span><span class="suit">&'+suit+';</span></div>';
  card.dataset.index = index;
  card.addEventListener('touchstart', (e) => { MakeMove(rank, suit, card.dataset.index); });
  index++;
  return card;
  // if (suit == "joker") return '<div style="width: 10%; height: 10%; overflow: hidden; margin: 0; padding: 0; float: left"><div class="card joker '+rank+'"><span class="rank"></span><span class="suit">Joker</span></div></div>';
  // else return '<div style="width: 10%; height: 10%; overflow: hidden; margin: 0; padding: 0; float: left"><div class="card rank-' + rank.toString().toLowerCase() + ' ' + suit + '"><span class="rank">'+rank+'</span><span class="suit">&'+suit+';</span></div></div>';
}