Games = new Meteor.Collection('games');

if (Meteor.isServer) {
  Meteor.publish('games', function () {
    return Games.find ({currentTurn: this.userId});
  });

  Meteor.publish('users', function () {
    return Meteor.users.find();
  });
}

if (Meteor.isClient) {
  Meteor.subscribe('games')
  Meteor.subscribe('users');
}

Meteor.methods({
  createGame: function (otherPlayerId) {
    var game = GameFactory.createGame([Meteor.userId(), otherPlayerId]);
    Games.insert(game);
  },
  takeTurn: function (gameId, id, card) {
    var game = Games.findOne(gameId),
    hand = game.players[id].hand;

    if (game.currentTurn[0] !== id || !Turns.inHand(hand,card)) return;


    var match = Turns.getMatch(card, game.table);

    if (match) {
      Turns.takeMatch(game, id, card, match);
    } else {
      game.table.push(card);
    }

    //Removes from table, Adds to pile, scores scopa
    //Regulates player turn 
    game.players[id].hand = Turns.removeCard(card, hand);
    game.currentTurn.unshift(game.currentTurn.pop());

    if (allHandsEmpty(game.players)) {
      if (game.deck.length > 0) {
        GameFactory.dealPlayers(game.players, game.deck);
      } else {
          scoreGame(game);
      }
    }
    Games.update(gameId, game);
  } 
});

//Returns true if all list values pass
function allHandsEmpty(players) {
  return _.every(players, function (player) {
    return player.hand.length === 0; 
  });
} 