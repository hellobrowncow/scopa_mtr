Games = new Meteor.Collection('games');

/*
game = {
    currentTurn = [],
    deck: [],
    table: [],
    players: {
      a: {
          hand: [],
          pile: [],
          score: {}
      }, 
      b: {}
    }
    inProgress: true / false,
    started: date,
    finished: data,
    winner: id
}

*/

if (Meteor.isServer) {
  Meteor.publish('games', function () {
    return Games.find ({currentTurn:this.usID});
  });

  Meteor.publish('users',function () {
    return Meteor.users.find();
  });
}

if (Meteor.isClient) {
  Meteor.subscribe('games');
  Meteor.subscribe('users');
}

Games.find()