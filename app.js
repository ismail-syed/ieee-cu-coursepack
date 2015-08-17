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

      var courseCode = e.target.courseCode.value; 
      var courseName = e.target.courseName.value; 
      var professor = e.target.professor.value; 
      var cost = e.target.cost.value; 

      Coursepacks.insert({
        courseCode: courseCode, 
        courseName: courseName, 
        professor: professor,
        cost: cost 
      });

      e.target.courseCode.value = ""; 
      e.target.courseName.value = ""; 
      e.target.professor.value = ""; 
      e.target.cost.value = ""; 
    }
  });

 Template.userInterface.events({
    "submit #submitRequest": function(e){

      e.preventDefault();

      var firstName = e.target.firstName.value; 
      var lastName = e.target.lastName.value; 
      var email = e.target.email.value; 
      var studentNumber = e.target.studentNumber.value; 
      var coursepack = e.target.coursepack.value;

      Requests.insert({
        firstName: firstName, 
        lastName: lastName, 
        email: email,
        studentNumber: studentNumber,
        coursepack: coursepack 
      });

      e.target.firstName.value; 
      e.target.lastName.value; 
      e.target.email.value; 
      e.target.studentNumber.value; 
      e.target.coursepack.value;
    }
  });

  Template.coursepack.events({
    "click .delete": function () {
      Coursepacks.remove(this._id);
    }
  });
  Template.request.events({
    "click .delete": function () {
      Requests.remove(this._id);
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
