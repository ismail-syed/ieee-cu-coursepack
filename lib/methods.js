Meteor.methods({

	createRequest: function( o ) {
	   Requests.insert({
        firstName: o.firstName, 
        lastName: o.lastName, 
        email: o.email,
        studentNumber: o.studentNumber,
        coursepack: o.coursepack,
        total: o.total, 
        purchased: o.purchased,
        createdAt: new Date()
      });
	},

	addCoursepack: function( o ) {
	 Coursepacks.insert({
        courseCode: o.courseCode, 
        courseName: o.courseName, 
        professor:o. professor,
        cost: o.cost,
        createdAt: new Date()
      });
	},

	deleteCoursepack: function( id ) {
      Coursepacks.remove( id );
	}, 

	deleteRequest: function( id ) {
      Requests.remove( id );
	},

  getAllRequests: function() {
    return Requests.find( {}, {sort: {createdAt: -1}} );
  },

  setPurcahsed:function(id, hasPurchased)
  {
    Requests.update(id, {
        $set: {purchased: hasPurchased}
    });
  }


});