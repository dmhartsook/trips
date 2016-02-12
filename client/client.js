Meteor.subscribe("cities");
Meteor.subscribe("activities");

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

var addCity = function(event) {
  var name = event.target.elements["cityName"].value;
  Meteor.call("addCity", name);
  event.target.elements["cityName"].value = "";
}

var addActivty = function(event) {
  var name = event.target.elements["name"].value;
  var selectCity = event.target.elements["activityCity"]
  var cityId = selectCity[selectCity.selectedIndex].value;
  Meteor.call("addActivity", name, cityId);
  event.target.elements["name"].value = "";
}

Template.addItemModal.events({
  "submit #add-item-form": function(event, template) {
    event.preventDefault();
    var itemEnumValue = event.target.elements["addItemEnum"].value;
    switch(parseInt(itemEnumValue)) {
      case addTemplateEnum.CITY:
        addCity(event);
        break;
      case addTemplateEnum.ACTIVITY:
        addActivty(event);
        break;
      default:
        // TODO: throw error
        console.log("Trying to insert unknown item");
        break;
    }

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
  },

  addItemEnum: function() {
    return Session.get("addItemFieldsTemplate");
  }
});

Template.insertActivityFields.helpers({
  cities: function() {
    return CitiesCollection.find({});
  }
});