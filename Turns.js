Turns = {};

Turns.inHand = function (set, card) {
  for (var i = 0; i < set.length; i++) {
    if (matchCard(set[i], card)) return true;
  }
  return false;
};

function matchCard(a, b) {
  return a.suit === b.suit && a.value === b.value;
}

Turns.getMatch = function (card, set) {
  var matches = Turns.findMatches(card, set); 
  if (matches.length > 0 ) {
   for (var i = 0; i < matches.length; i++) {
    var match = matches;
  }
    return match; 
  }
  return null;
};

Turns.findMatches = function (card, set) {
  var matches = [];
  set.forEach(function (theirhandcard) {
    if (theirhandcard.value === card.value) matches.push([theirhandcard]);
  }); 

  return matches;
};


Turns.takeMatch = function (game, id, card, match) {
  match.forEach(function (matchCard) {
    game.players[id].pile.push.apply(game.players[id].pile, matchCard);
    
    if (match.length > 0 ) {
      game.players[game.currentTurn[1]].hand = Turns.removeCards(matchCard, game.players[game.currentTurn[1]].hand);
    }

    game.players[id].pile.push(card);
    game.lastScorer = id; 
  }); 

  if (game.table.length === 0) {
    game.players[id].score.scopa++;
  }
};

Turns.removeCard = function (card, set) {
  return set.filter(function (setCard) { 
    return !matchCard(card, setCard);
  });
};

Turns.removeCards = function (card, set) {
    return set.filter(function (setCard) {
        return !matchCard(card[0], setCard);
    });
};
