var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var app = express();

app.set('views', _dirname + '/views');
app.engine('html', require('ejs').renderFile);

app.use (session({secret: 'ssshhhh!'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var sess;


app.get('/', function(req,res) {
    sess = req.session;
    //Session set when user requests our app via url
    if (sess.email) {
        /*
         This line check session existence
         if it existed will do some action
         */

        res.redirect('/admin');

    }
    else {
        res.render('index.html');
    }
    sess.email; //$_SESSION['email'] in PHP
    sess.username;

});
/* Assigned the 'session' to 'sess'.
    Now we can create any number of sessions we want.
    in PHP we do as $_SESSION['var name'].
    Here we do it like this.
 */



app.post('/login', function(req,res)
{
    sess = req.session;
    //email comes from html page
    sess.email = req.body.email;
    res.end('done');
});


app.get('/admin', function(req,res) {
    sess = req.session;

    if (sess.email) {
        res.write('<h1>Hello ' + sess.email + '</h1>');
        res.end('<a href="+">Logout</a>');
    }
    else {
        res.write('<h1>Please login first.</h1>');
        res.end('<a href="+">Login</a>');
    }
});


app.get('/logout', function(req,res){
    req.session.destroy(function(err){

        if(err) {
            console.log(err);
        }else{
            res.redirect('/');
        }
    });
});

app.listen(3000, function(){
    console.log("App Started on PORT 3000");
});

