scoreGame = function (game) {

  game.players[game.lastScorer].pile.push.apply(game.players[game.lastScorer].pile, game.table);
  game.table = [];
  game.inProgress = false;
  game.finished = new Date();


  Object.keys(game.players).forEach( function (id) {
    var pile = game.players[id].pile

  });

    if (game.players[game.currentTurn[0]].score == game.players[game.currentTurn[1]].score) {

    } else if (game.players[game.currentTurn[0]].score > game.players[game.currentTurn[1]].score) {
      game.winner = game.players[game.currentTurn[0]];

    } else {
      game.winner = game.players[game.currentTurn[1]];
    }

  game.winner = false;
};

