  // COLLECTION SUBSCRIPTIONS
  Meteor.subscribe("coursepacks");
  Meteor.subscribe("requests");

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