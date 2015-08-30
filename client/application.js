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
      
      // coursepacks array population
      requestObj.coursepack = [];
      var v_aCoursepacks = $('#coursepacksArray .form-control');
      for(var i=0; i < v_aCoursepacks.length; i++)
      {
        requestObj.coursepack[i] = v_aCoursepacks[i].value;
      }

      if( isFormValid(requestObj) )
      {
        Meteor.call("createRequest", requestObj);
        $("#sendRequest-panel").addClass("hidden");

        var v_sThankYou = "Thank you " + requestObj.firstName +  " for requesting a coursepack. " +
                        " IEEE Carleton will contact you shortly to purchase your requested coursepacks";
        $("#confirmationMessage").html( v_sThankYou );       
        $("#confirmationMessage").removeClass("hidden");
        $("#validationError").addClass("hidden");
      }
      else
      {
        $("#validationError").removeClass("hidden");
      }
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

  Template.exportRequests.events({
    'click .export-data': function() { 
      var requestsRecords =  Requests.find({}, {sort: {createdAt: -1}});

      var csvDocument = "";
      csvDocument += "Name, Student Number, Email, Coursepack, Date of Request\r\n";

      requestsRecords.forEach(function(rec) {
        csvDocument += rec.firstName + " " + rec.lastName + "," + 
                       rec.studentNumber + "," + rec.email + ", " + 
                       rec.coursepack + "," + rec.createdAt + "\r\n";
      });

      var dlLink = document.createElement('a');
      var date = new Date();
      dlLink.download = "Requests_ " + date + ".csv";
      dlLink.href = "data:application/csv," + escape(csvDocument);
      dlLink.click();
    }
  });


function isFormValid(o)
{
    if( o.firstName === "" ) { return false; }
    if( o.lastName === "") { return false; }
    if( o.email === "") { return false; }
    if( !o.email.includes("@cmail.carleton.ca") ) { return false; }
    if( o.studentNumber.length !== 9) { return false; }

    return true;
}

$(function()
{
    $(document).on('click', '.btn-add', function(e)
    {
        e.preventDefault();

        var controlForm = $('.controls form:first'),
            currentEntry = $(this).parents('.entry:first'),
            newEntry = $(currentEntry.clone()).appendTo(controlForm);

        newEntry.find('input').val('');
        controlForm.find('.entry:not(:last) .btn-add')
            .removeClass('btn-add').addClass('btn-remove')
            .removeClass('btn-success').addClass('btn-danger')
            .html('<span class="glyphicon glyphicon-minus"></span>');
    }).on('click', '.btn-remove', function(e)
    {
    $(this).parents('.entry:first').remove();

    e.preventDefault();
    return false;
  });
});
    
