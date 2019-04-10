const express = require('express');
const cookeParser = require('cookie-parser');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const session = require('express-session');
const hbs = require('hbs');
const utils = require('./utils');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/registration', { useNewUrlParser: true });
var db = mongoose.connection;


const user = require('./routes/user.route');
const existing_user = require('./routes/login.route');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookeParser());

app.use(
    session({
        secret: 'junior',
        resave: true,
        saveUninitialized: false,
        store: new MongoStore(
            {mongooseConnection: db
            })
    }));

app.use(expressValidator());

app.use('/register', user);
app.use('/verify', existing_user);

app.get('/', (request, response) => {
    response.render('home.hbs', {
        title: 'Home Page',
        head: 'Home of the Dark Knight'

    });
});

/*
function requiresLogin(req, res, next) {
    //console.log("before " + req.session.userId);
    if (existing_user.authenticate) {
        return next();
    }else {
        res.send('You must be logged in to view this page.');
    }
}
*/
/*var db1 = utils.getDb();
console.log(db1.collection('registration').find().toArray(function(err, user) {
}));*/
app.get('/mathgame',(request, response) => {
    response.render('game.hbs', {
        title: 'Math Game',
        head: 'Welcome To The Game Center',
    });
});

app.get('/created', (request, response) => {
    response.render('created.hbs', {
        title: 'created',
        head: 'User has been created',
    })
});

app.get('*', (request, response) => {
    response.render('404.hbs', {
        title: '404 Error',
        head: 'Oops! 404',
        error: 'Page Not Found'
    })
});



/*app.use((request, response, next) => {
    response.render('maintenance.hbs', {
        title: 'Maintenance page',
    });
    next()
});*/

app.listen(8080, () => {
    console.log('Server is up on the port 8080');
    utils.init();

});


/*

var file = 'users_database.json';

var createUser = (first_name, last_name, username, password) => {
    var insert_user = {
        "First Name": first_name,
        "Last Name": last_name,
        "Username": username,
        "Password": password,
    };

    try {

        if (password.length < 8 ) throw "Password must be at least 8 characters!";
        if (typeof username != "string") throw "Username must be a string!";

        if (fs.existsSync(file)){
            var readUser = fs.readFileSync(file);
            var users_list = JSON.parse(readUser);

            users_list.find(function(element) {
                if (element.Username == username) throw "Username already exists!";
            });

            users_list.push(insert_user);

            var result = JSON.stringify(users_list, null, 2);

            fs.writeFileSync(file, result, function (err) {
                if (err){
                    console.log('Could Not Add!')}
            });
        }
    } catch (err) {
        console.log(err)
    }
};
var verify_user = "";

var loginUser = (user_id, password_id) => {
    var readUser = fs.readFileSync(file);
    var users_list = JSON.parse(readUser);

    var search = function(users) {
        return users.Username === user_id && users.Password === password_id
    };
    //verify_user = users_list.some(search)
    console.log(users_list.some(search))
};*/
