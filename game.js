class game {
  constructor(host) {
    this.status = "requested";
    var date = new Date(); 
    this.started = date.getTime();
    this.updated = this.started;
    
    this.player1 = null;
    this.player2 = host;
    this.lastMoveBy = 2;
    
    this.moves = [];
    this.longestMoveTime = 0;
  }
}