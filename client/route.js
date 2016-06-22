FlowRouter.route('/', {
  action: function() {
    if (Meteor.userId() == null) {
        FlowRouter.redirect('/signin');
    }
    BlazeLayout.render("mainBody", {content: "home"});
  }
});

FlowRouter.route('/signin', {
  action: function() {
    BlazeLayout.render("mainBody", {content: "signIn"});
  }
});

FlowRouter.route('/trip/:tripId', {
  action: function() {
    if (Meteor.userId() == null) {
        FlowRouter.redirect('/signin');
    }
    BlazeLayout.render("mainBody", {content: "tripView"});
  }
});