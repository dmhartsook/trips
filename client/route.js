FlowRouter.route('/', {
  name: 'home',
  action: function() {
    BlazeLayout.render("mainBody", {content: "home"});
  }
});

FlowRouter.route('/trip/:tripId', {
  name: 'trip',
  action: function() {
    BlazeLayout.render("mainBody", {content: "tripView"});
  }
});