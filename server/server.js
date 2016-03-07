Meteor.publish("cities", function () {
  return CitiesCollection.find( {owner: this.userId}, {fields: {name: 1, startDate: 1, endDate:1}} ); // only publish name
});

Meteor.publish("activities", function () {
  return ActivitiesCollection.find( {owner: this.userId}, {fields: {name: 1, cityId: 1}} ); 
});


// TODO: add security
Meteor.methods({
  addActivity: function(name, cityId) {
    if (!Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }

    sanitizeHtml(name);
    sanitizeHtml(cityId);

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

    sanitizeHtml(name);
    sanitizeHtml(startDate);
    sanitizeHtml(endDate);

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

    CitiesCollection.remove({
        _id: id,
        owner: Meteor.userId()
      }, deleteCityCallback);
  }
});

function deleteCityCallback(error, number) {
  if (error) {
    console.error(error)
    // TODO: Display error on client
  } else if (number == 0) {
    // TODO: else display failed to remove on client 
    console.error("number: " + number)
  }
}