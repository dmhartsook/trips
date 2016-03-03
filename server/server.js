Meteor.publish("cities", function () {
  return CitiesCollection.find( {}, {fields: {name: 1, startDate: 1, endDate:1}} ); // only publish name
});

Meteor.publish("activities", function () {
  return ActivitiesCollection.find( {}, {fields: {name: 1, cityId: 1}} ); 
});

// TODO: add security
Meteor.methods({
  addActivity: function(name, cityId) {
    if (!Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }

    check(name, String);
    check(cityId, String);

    ActivitiesCollection.insert({
      name: name,
      cityId: cityId,
      createdAt: new Date(),
      owner: Meteor.userId()
    });
  },


  addCity: function(name, startDate, endDate) {
    if (!Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }

    check(name, String);

    CitiesCollection.insert({
      createdAt: new Date(),
      endDate: endDate,
      name: name,
      startDate: startDate,
      owner: Meteor.userId()
    });
  },

  deleteCity: function(id) {
    if (!Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }

    CitiesCollection.remove(id);
  }
});