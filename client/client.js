Meteor.subscribe("cities");

addTemplateEnum = {
  UNKNOWN: 0,
  CITY: 1,
  ACTIVITY: 2
};

Session.setDefault('addItemFieldsTemplate', addTemplateEnum.UNKNOWN);

Template.body.helpers({
  cities: function() {
    return CitiesCollection.find({});
  }
});

Template.body.events({
  'click .add-item-list': function(event) {
    var addTemplate = addTemplateEnum.UNKNOWN;
    switch(event.target.id) {
      case "add-city-btn":
        addTemplate = addTemplateEnum.CITY;
        break;
      case "add-activity-btn":
        addTemplate = addTemplateEnum.ACTIVITY;
        break;
    }
    Session.set('addItemFieldsTemplate', addTemplate);
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
    switch(Session.get('addItemFieldsTemplate')) {
      case addTemplateEnum.CITY:
        return "insertCityFields";
      case addTemplateEnum.ACTIVITY:
        return "insertActivityFields";
      default:
        return "";
    }
    
  }, 
  title: function() {
    switch(Session.get('addItemFieldsTemplate')) {
      case addTemplateEnum.CITY:
        return "Add a City";
      case addTemplateEnum.ACTIVITY:
        return "Add an Actvity";
      default:
        return "";
    }
  }
});