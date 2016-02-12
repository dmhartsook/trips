Meteor.publish("cities", function () {
  return CitiesCollection.find( {}, {fields: {name: 1}} ); // only publish name
});

Meteor.publish("activities", function () {
  return ActivitiesCollection.find( {}, {fields: {name: 1, cityId: 1}} ); 
});

// TODO: add security
Meteor.methods({
  addActivity: function(name, cityId) {
    ActivitiesCollection.insert({
      name: name,
      cityId: cityId,
      createdAt: new Date()
    });
  },


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