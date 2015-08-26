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