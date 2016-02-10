Meteor.subscribe("cities");


Template.body.helpers({
  cities: function() {
    return CitiesCollection.find({});
  }
});

Template.newCityModal.events({
  "submit #new-city-form": function(event, template) {

    // Prevent default browser form submit
    event.preventDefault();

    var name = event.target.elements["cityName"].value;

    console.log("would add " + name);
    // Meteor.call("addCity", name);

    event.target.elements["cityName"].value = "";

    template.$("#new-city-modal").modal('hide');
  }
});