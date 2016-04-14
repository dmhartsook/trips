Meteor.subscribe("cities");
Meteor.subscribe("activities");

addTemplateEnum = {
  UNKNOWN: 0,
  CITY: 1,
  ACTIVITY: 2
};

Session.setDefault('addItemFieldsTemplate', addTemplateEnum.UNKNOWN);
Session.set('selectedCity', null);

Accounts.ui.config({
  passwordSignupFields: "USERNAME_ONLY"
});

Template.body.helpers({
  cities: function() {
    return CitiesCollection.find(
      {owner: this.userId},
      { transform: function (doc) {
         doc.startDate = doc.startDate.toDateString();
         doc.endDate = doc.endDate.toDateString();
         return doc;
      }}
    );
  }
});

Template.body.events({
  'click .add-city-btn': function() {
    Session.set('addItemFieldsTemplate', addTemplateEnum.CITY);
  },
  'click .add-activity-btn': function() {
    Session.set('addItemFieldsTemplate', addTemplateEnum.ACTIVITY);
  }
});


Template.activity.helpers({
  city: function() {
    return Template.parentData(2).city
  },
});


var addCity = function(event) {
  var name = event.target.elements["cityName"].value;
  var startDate = Template.instance().$("#cityStartDatepicker").datepicker('getDate');
  var endDate = Template.instance().$("#cityEndDatepicker").datepicker('getDate');
  Meteor.call("addCity", name, startDate, endDate, function(error, result) {
    if (error) console.error(error);
  });
  clearCity(event.target);
}

var addActivty = function(event) {
  var name = event.target.elements["name"].value;
  var selectCity = event.target.elements["activityCity"]
  var cityId = selectCity[selectCity.selectedIndex].value;
  Meteor.call("addActivity", name, cityId, function(error, result) {
    if (error) console.error(error);
  });
  clearActivity(event.target);
}

var clearCity = function(form) {
  form.elements["cityName"].value = "";
  Template.instance().$("#cityStartDatepicker").datepicker('clearDates');
  Template.instance().$("#cityEndDatepicker").datepicker('clearDates');
}

var clearActivity = function(form) {
  form.elements["name"].value = "";
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
        console.error("Trying to insert unknown item");
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


Template.city.helpers({
  activities: function() {
    return ActivitiesCollection.find({
      owner: this.userId, 
      cityId: this.city._id
    });
  }
});

Template.city.events({
  'click .delete-city': function(event, template) {
    Session.set('selectedCity', template.data.city);
    template.$('#delete-city-modal').modal('show');
  }
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


Template.insertActivityFields.helpers({
  cities: function() {
    return CitiesCollection.find({owner: this.userId});
  }
});

Template.insertCityFields.rendered = function() {
  $('#cityStartDateInput').datepicker({
    autoclose: true
  });
  $('#cityEndDateInput').datepicker();
}