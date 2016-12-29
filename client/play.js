Template.hand.events({
  'click .card': function (evt, template) {
    if (template.data.yourTurn) {
      Meteor.call('takeTurn', template.data._id, Meteor.userId(), this);
    }
  } 
}); 

Template.tableDeck.events({
  'click .card': function (evt, template) {
    if (template.data.yourTurn) {
      Meteor.call('dealCard', template.data._id, Meteor.userId());
    }
  } 
});