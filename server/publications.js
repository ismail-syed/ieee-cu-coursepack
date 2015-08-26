Meteor.publish("coursepacks", function() {
	return Coursepacks.find();
});

Meteor.publish("requests", function() {
	return Requests.find();
});