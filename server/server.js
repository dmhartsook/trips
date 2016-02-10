Meteor.publish("cities", function () {
  return CitiesCollection.find( {}, {fields: {name: 1}} ); // only publish name
});

// TODO: add security
Meteor.methods({
  addCity: function(name) {
    CitiesCollection.insert({
      name: name,
      createdAt: new Date()
    });
  },

  deleteCity: function(id) {
    CitiesCollection.remove(id);
  }
});