  Template.registerHelper("Admin", function(){
    if(Meteor.user()._id === "LpjvjaYrqTLnnzm5z"){
      return true;
    }
    return false;
  });
// production: ivEGE6ndxNMSLgkbM
// LpjvjaYrqTLnnzm5z

  Template.coursepacks.helpers({
    coursepacks: function () {
      return Coursepacks.find({}, {sort: {createdAt: -1}} );
    }   
  });

  Template.userInterface.helpers({
    coursepacks: function () {
      return Coursepacks.find({}, {sort: {createdAt: -1}} );
    }     
  });

  Template.requests.helpers({
    requests: function () {
      return Requests.find({}, {sort: {createdAt: -1}} );
    }     
  });