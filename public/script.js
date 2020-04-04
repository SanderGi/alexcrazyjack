// fetch("/getGame?id=8xqxlGnqYR94h6jz").then(async res => {
//   console.log(await res.json());
// });

CreateBoard();
function resizeBoard() {
  let width = (window.innerHeight > window.innerWidth) ? "100%" : "calc(100vh - 14em)";
  document.getElementById("board").style = "width: " + width + "; height: calc(100vh - 14em); margin: auto; border-left: dashed; border-right: dashed";
  document.getElementById("name").innerHTML = width;
}
resizeBoard()
window.onresize = function() { resizeBoard(); };

function CreateBoard() {
  let board = document.getElementById("board");
  let markup = "";
  markup += createCardMarkup("big", "joker", "left");
  board.innerHTML = markup;
}

function createCardMarkup(rank, suit, float) {
  if (suit == "joker") return '<div style="width: 10%; height: 10%; overflow: hidden; margin: 0; padding: 0; float: '+float+'"><div class="card joker '+suit+'"><span class="rank"></span><span class="suit">Joker</span></div></div>';
  else return "<div style='width: 10%; height: 10%; overflow: hidden; margin: 0; padding: 0; float: " + float + "><div class='card rank-" + rank + " " + suit + "'><span class='rank'>"+rank+"</span><span class='suit'>&"+suit+";</span></div></div>";
}