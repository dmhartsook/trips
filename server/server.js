Meteor.publish("cities", function () {
  // TODO: publish only certain fields
  return CitiesCollection.find();
});


Meteor.methods({
  addCity: function (name) {
    // TODO: add security

    // TODO: ensure name is unique (ensureIndex)
 
    CitiesCollection.insert({
      name: name,
      createdAt: new Date()
    });
  },
});