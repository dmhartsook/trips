if (Meteor.isClient) {
  // TODO: move this to server and make it into legit database
  Template.body.helpers({
    cities: [
      { city_id: "1" },
      { city_id: "2" },
      { city_id: "3" }
    ]
  });

  Template.city.helpers({
    activities: [
      { activity_id: "1" },
      { activity_id: "2" },
      { activity_id: "3" }
    ]
  });

  Template.activity.helpers({
    city: function() {
      return Template.parentData(2).city
    },
  });

}