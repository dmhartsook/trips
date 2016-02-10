Meteor.subscribe("cities");

Template.body.helpers({
  cities: function() {
    return CitiesCollection.find({});
  }
});

Template.addItemModal.events({
  "submit #add-item-form": function(event, template) {
    event.preventDefault();
    var name = event.target.elements["cityName"].value;

    // console.log("would add " + name);
    Meteor.call("addCity", name);

    event.target.elements["cityName"].value = "";

    template.$("#add-item-modal").modal('hide');
  }
});

Template.addItemModal.helpers({
  addItemFieldsTemplate: function() {
    return "insertCityFields";
  }
})