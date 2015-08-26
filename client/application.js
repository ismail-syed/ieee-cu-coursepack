if (Meteor.isClient) {

  // ROUTING
  Router.route('/', function () {
    this.render('home');
  });
  Router.route('/adminInterface', function () {
    this.render('admin');
  });
  

  Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
  });

  Template.registerHelper("Admin", function(){
    if(Meteor.user()._id === "LpjvjaYrqTLnnzm5z"){
      return true;
    }
    return false;
  });

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

  Template.addCoursepackForm.events({
    "submit #createCoursepack": function(e){
      e.preventDefault();

      var addCoursepackObj = {};
      addCoursepackObj.courseCode = e.target.courseCode.value; 
      addCoursepackObj.courseName = e.target.courseName.value; 
      addCoursepackObj.professor = e.target.professor.value; 
      addCoursepackObj.cost = e.target.cost.value; 

      Meteor.call("addCoursepack", addCoursepackObj);

      e.target.courseCode.value = ""; 
      e.target.courseName.value = ""; 
      e.target.professor.value = ""; 
      e.target.cost.value = ""; 
    }
  });

 Template.userInterface.events({
    "submit #submitRequest": function(e){

      e.preventDefault();

      var requestObj = {};
      requestObj.firstName = e.target.firstName.value; 
      requestObj.lastName = e.target.lastName.value; 
      requestObj.email = e.target.email.value; 
      requestObj.studentNumber = e.target.studentNumber.value; 
      requestObj.coursepack = e.target.coursepack.value;

      Meteor.call("createRequest", requestObj);

      e.target.firstName.value; 
      e.target.lastName.value; 
      e.target.email.value; 
      e.target.studentNumber.value; 
      e.target.coursepack.value;
    }
  });

  Template.coursepack.events({
    "click .delete": function () {
      Meteor.call("deleteCoursepack", this._id);
    }
  });
  Template.request.events({
    "click .delete": function () {
      Meteor.call("deleteRequest", this._id);
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
