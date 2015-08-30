  // ROUTING
  Router.route('/', function () {
    this.render('home');
  }); 
  Router.route('/adminInterface', function () {
    this.render('admin');
  });

  Router.route('/csv', {
    where: 'server',
    action: function () {
      var filename = 'requets.csv';
      var fileData = "";

      var headers = {
        'Content-type': 'text/csv',
        'Content-Disposition': "attachment; filename=" + filename
      };
      var records = Requests.find();
      // build a CSV string. Oversimplified. You'd have to escape quotes and commas.
      records.forEach(function(rec) {
        fileData += rec.firstName + " " + rec.lastName + "," + rec.email + "," + rec.studentNumber + "," + rec.coursepack + "\r\n";
      });
      this.response.writeHead(200, headers);
      return this.response.end(fileData);
    }
  });

  Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
  });


