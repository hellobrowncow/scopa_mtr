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

  dealCard: function (gameId, id) {
    var game = Games.findOne(gameId),
    hand = game.players[id].hand;

    if (game.currentTurn[0] !== id) return;

    if (game.deck.length > 0) {
      card = game.deck.shift();
      hand = hand.push(card);
    }

    var matches = [];
    game.players[id].hand.forEach(function (localhandcard) {
      if (localhandcard.value === card.value) matches.push([localhandcard]);
    }); 

    if (matches.length === 4) {
      Turns.takelocalMatch(game, id, matches, game.players[id].hand);
    }

      game.currentTurn.unshift(game.currentTurn.pop());

      Games.update(gameId, game);
  },

  takeTurn: function (gameId, id, card) {
    var game = Games.findOne(gameId),
    hand = game.players[id].hand;

    if (game.currentTurn[0] !== id || !Turns.inHand(hand,card)) return;

    var match = Turns.getMatch(card, game.players[game.currentTurn[1]].hand);

    if (match) {
        Turns.takeMatch(game, id, card, match);
      } else {
        game.table.push(card);
        game.players[id].hand = Turns.removeCard(card, game.players[id].hand); 
      }

    var localmatch = Turns.getMatch(card, hand); //returns localmatches including card

    if (localmatch) {
        Turns.takelocalMatch(game, id, localmatch, hand);
      }
     
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