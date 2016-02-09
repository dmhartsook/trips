Meteor.subscribe("cities");


Template.body.helpers({
  cities: function() {
    return CitiesCollection.find({});
  }
});

Template.city.helpers({
  activities: function() {
    return ActivitiesCollection.find({});
  }
});

Template.activity.helpers({
  city: function() {
    return Template.parentData(2).city
  },
});

Template.insertCity.events({
  "submit .new-city": function(event) {

    // Prevent default browser form submit
    event.preventDefault();

    var name = event.target.elements["cityName"].value;

    Meteor.call("addCity", name)

    event.target.elements["cityName"].value = "";
  }
})