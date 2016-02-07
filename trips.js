if (Meteor.isClient) {
  // TODO: move this to server and make it into legit database
  Template.body.helpers({
    cities: [
      { id: "1" },
      { id: "2" },
      { id: "3" }
    ]
  });

  Template.city.helpers({
    activities: [
      { id: "1" },
      { id: "2" },
      { id: "3" }
    ]
  });

}