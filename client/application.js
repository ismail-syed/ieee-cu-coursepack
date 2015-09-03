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
      
      // clear total
      $('#total').html("");

      e.preventDefault();
      var reqObj = {};
      reqObj.firstName = e.target.firstName.value; 
      reqObj.lastName = e.target.lastName.value; 
      reqObj.email = e.target.email.value; 
      reqObj.studentNumber = e.target.studentNumber.value; 
      
      // coursepacks array population
      reqObj.coursepack = [];
      var v_aCoursepacks = $('#coursepacksArray .form-control');
      for(var i=0; i < v_aCoursepacks.length; i++)
      {
        reqObj.coursepack[i] = v_aCoursepacks[i].value;
      }

      if( isFormValid(reqObj) )
      {
        // Populate Modal
        $('#fName').html( $('#firstName').val() );
        $('#lName').html( $('#lastName').val() );
        $('#c-email').html( $('#email').val() );
        $('#c-studentNum').html( $('#studentNumber').val() );

        var v_aCoursepacks = $('#coursepacksArray .form-control');
        var v_iTotal = 0;
        for(var i=0; i < v_aCoursepacks.length; i++)
        {
          v_iTotal += parseFloat(v_aCoursepacks[i].value.split('$')[1]);
          var v_string = '<li>' +  v_aCoursepacks[i].value; + '</li>';
          $('#c-coursepacks').append( v_string );
        }
        $('#total').html("Total: $" + v_iTotal.toFixed(2) );

        // show modal
        $('#modalBtn').click();
        
      }
      else
      {
        $("#validationError").removeClass("hidden");
      }
    },
    "click #confirmRequest": function() 
    {
      var requestObj = {};
      requestObj.firstName = $('#firstName').val(); 
      requestObj.lastName = $('#lastName').val(); 
      requestObj.email = $('#email').val()
      requestObj.studentNumber = $('#studentNumber').val()
      requestObj.coursepack = [];
      var v_iTotal = 0;
      requestObj.purchased = false;
      var v_aCoursepacks = $('#coursepacksArray .form-control');
      for(var i=0; i < v_aCoursepacks.length; i++)
      {
        v_iTotal += parseInt(v_aCoursepacks[i].value.split('$')[1]);
        requestObj.coursepack[i] = v_aCoursepacks[i].value;
      }
      requestObj.total = v_iTotal;
      Meteor.call("createRequest", requestObj);

      $('#basicModal').modal('hide');
      $("#validationError").addClass("hidden");
      $("#sendRequest-panel").addClass("hidden");
      $("#confirmationMessage").removeClass("hidden");
      var v_sThankYou = "Thank you " + requestObj.firstName +  " for requesting a coursepack. " +
                        " IEEE Carleton will contact you shortly to purchase your requested coursepacks";
      $("#confirmationMessage").html( v_sThankYou );       
    },
    "click #cancel": function()
    {
      // Populate Modal
      $('#fName').html("");
      $('#lName').html("");
      $('#c-email').html("");
      $('#c-studentNum').html("");
      $('#c-coursepacks').empty();
      $('#total').html("");
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
    },
    "click #purchasedCheckbox": function( ){
      var purch = $('#purchasedCheckbox').prop('checked');
      Meteor.call("setPurcahsed", this._id, $('#purchasedCheckbox').prop('checked'));
    }

  });

  Template.exportRequests.events({
    'click .export-data': function() { 
      var requestsRecords =  Requests.find({}, {sort: {createdAt: -1}});

      var csvDocument = "";
      csvDocument += "Name, Student Number, Email, Coursepack, Total, Purchased, Date of Request\r\n";

      requestsRecords.forEach(function(rec) {
        var v_sCoursepacks = ""; 
        rec.coursepack.forEach(function(i){
          v_sCoursepacks +=  " [" + i + "] ";
        });
        csvDocument += rec.firstName + " " + rec.lastName + "," + 
                       rec.studentNumber + "," + rec.email + "," + 
                       v_sCoursepacks + "," + rec.total + "," +
                       rec.purchased + "," + rec.createdAt + "\r\n";
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
    
