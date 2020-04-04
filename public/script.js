// fetch("/getGame?id=8xqxlGnqYR94h6jz").then(async res => {
//   console.log(await res.json());
// });

let index = 0;
CreateBoard();
function resizeBoard() {
  let width = (window.innerHeight > window.innerWidth) ? "100%" : "calc(100vh - 14em)";
  document.getElementById("board").style = "width: " + width + "; height: calc(100vh - 14em); margin: auto;" + (width === "100%" ? "border: none" : "border-left: solid; border-right: solid;");
  // document.getElementById("name").innerHTML = width;
  if (window.innerHeight > window.innerWidth) document.getElementById("cardCanvas").className = "playingCards " + (window.innerWidth > 200 ? "faceImages" : "simpleCards");
  else document.getElementById("cardCanvas").className = "playingCards " + (window.windowHeight > 200 ? "faceImages" : "simpleCards");
}
resizeBoard()
window.onresize = function() { resizeBoard(); };

function MakeMove(rank, suit, col, row) {
  document.getElementById("name").innerHTML = rank + " " + suit + " " + col + " " + row;
}

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
}

function createCard(rank, suit) {
  let card = document.createElement('div');
  card.style = "width: 10%; height: 10%; overflow: hidden; margin: 0; padding: 0; float: left";
  if (suit == "joker") card.innerHTML = '<div class="card joker '+rank+'"><span class="rank"></span><span class="suit">Joker</span></div>';
  else card.innerHTML = '<div class="card rank-' + rank.toString().toLowerCase() + ' ' + suit + '"><span class="rank">'+rank+'</span><span class="suit">&'+suit+';</span></div>';
  card.data
  card.addEventListener('touchstart', (e) => MakeMove(rank, suit, e.target.dataset.index));
  index++;
  return card;
  // if (suit == "joker") return '<div style="width: 10%; height: 10%; overflow: hidden; margin: 0; padding: 0; float: left"><div class="card joker '+rank+'"><span class="rank"></span><span class="suit">Joker</span></div></div>';
  // else return '<div style="width: 10%; height: 10%; overflow: hidden; margin: 0; padding: 0; float: left"><div class="card rank-' + rank.toString().toLowerCase() + ' ' + suit + '"><span class="rank">'+rank+'</span><span class="suit">&'+suit+';</span></div></div>';
}