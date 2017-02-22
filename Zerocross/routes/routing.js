module.exports = function (app,passport) {

    app.get('/', function (req, res) {
        res.render('index',{ title: 'Welcome | ZeroCross',page:'templates/home',start:false });
    });

    app.get('/login', function(req, res) {
    
        res.render('index',{ title: 'Login | ZeroCross',page:'templates/login',message: req.flash('loginMessage') ,start:false });
     
    });
    app.get('/signup', function(req, res) {

        res.render('index',{ title: 'SignUp | ZeroCross',page:'templates/signup',message: req.flash('signupMessage')  ,start:false });

    });
    app.get('/start', isLoggedIn, function(req, res) {
        res.render('index',{ title: '*Playing | ZeroCross',page:'templates/match',   user : req.user ,start:true });
     
    });

    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    // app.get('/start', function (req, res) {
    //     res.render('index',{ title: 'ZeroCross',page:'templates/match',start:true });
    // });


    // signup form
    app.post('/signup', passport.authenticate('usersignup', {
        successRedirect : '/start', 
        failureRedirect : '/signup', 
        failureFlash : true 
    }));

    // login form
    app.post('/login', passport.authenticate('userlogin', {
        successRedirect : '/start',
        failureRedirect : '/login', 
        failureFlash : true 
    }));
};
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/');
}