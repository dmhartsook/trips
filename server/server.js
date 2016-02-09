Meteor.publish("cities", function () {
  return CitiesCollection.find( {}, {fields: {name: 1}} ); // only publish name
});


Meteor.methods({
  addCity: function (name) {
    // TODO: add security
 
    CitiesCollection.insert({
      name: name,
      createdAt: new Date()
    });
  },
});