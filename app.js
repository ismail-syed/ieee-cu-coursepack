if (Meteor.isClient) {
  Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
  });

  Template.registerHelper("Admin", function(){
    if(Meteor.user()._id === "rt6pqgewz7QRAzqyz"){
      return true;
    }
    return false;
  });

  Template.coursepacks.helpers({
    coursepacks: function () {
      return Coursepacks.find({}, {sort: {createdAt: -1}} );
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
      alert("course submitted");
    }
  });

  Template.coursepack.events({
    "click .delete": function () {
      Coursepacks.remove(this._id);
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
