scoreGame = function (game) {

  game.players[game.lastScorer].pile.push.apply(game.players[game.lastScorer].pile, game.table);
  game.table = [];
  game.inProgress = false;
  game.finished = new Date();


  Object.keys(game.players).forEach( function (id) {
    var pile = game.players[id].pile

  });

  var highest = ['x', -1];

  Object.keys(game.players).forEach(function (id) {
    var s = game.players[id].score;

    game.players[id].score.total = s;
 
    if ( game.players[id].score.total > highest [1]) {
      highest = [id, game.players[id].score.total];
    } else if (game.players[id].score.total === highest[1]) {
      highest = false;
    }
  });

  game.winner = highest ? highest[0] : "tie";
};

