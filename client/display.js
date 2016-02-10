Session.set('selectedCity', null);

Template.city.helpers({
  activities: function() {
    return ActivitiesCollection.find({});
  }
});

Template.city.events({
  'click .delete-city': function(event, template) {
    Session.set('selectedCity', template.data.city);
    template.$('#delete-city-modal').modal('show');
  }
});

Template.activity.helpers({
  city: function() {
    return Template.parentData(2).city
  },
});

Template.delete_alert.helpers({
  city: function() {
    return Session.get('selectedCity');
  }
})

Template.delete_alert.events({
  'submit #delete-city-confirm': function(event, template) {
    event.preventDefault();
    var cityId = event.target.elements["delete-city-id-field"].value;
    
    Meteor.call("deleteCity", cityId);

    template.$('#delete-city-modal').modal('hide');
  },
  'show.bs.modal': function(event) {
    // Stop it from showing until the session variable is set in .delete-city click
    event.stopPropagation();
  }
});