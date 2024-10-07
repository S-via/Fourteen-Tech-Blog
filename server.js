// entry point
const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars')
const routes = require('./controllers/api');

// not sure if needed
/* const helpers = require('utils') */

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

// handlebars.js engine for helpers ????
const hbs= exphbs.create({helpers});

// UNFINISHED COOKIE:
const sess = {
    secret: 'Super secret secret',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};
app.use(session(sess));

// to inform which temples from handlebars to use from express.js
app.engine('handlebars',hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,'public')));

app.use(routes); // find right path to routes 

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`App listening ${PORT}`));
});