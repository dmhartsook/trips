FlowRouter.route('/', {
  name: 'home',
  action: function() {
    BlazeLayout.render("mainBody", {content: "home"});
  }
});

FlowRouter.route('/signin', {
  name: 'signin',
  action: function() {
    BlazeLayout.render("mainBody", {content: "signIn"});
  }
});

FlowRouter.route('/trip/:tripId', {
  name: 'trip',
  action: function() {
    BlazeLayout.render("mainBody", {content: "tripView"});
  }
});