// entry point
const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars')
const routes = require('./controllers');
const helpers = require('./utils/helpers');

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

// handlebars.js engine for helpers ????
const hbs= exphbs.create({helpers});


const sess = {
    secret: 'Super secret secret',
    cookie: {
        maxAge: 300000,
        httpOnly: true,
        secure: false,
        sameSite: 'strict',
    },
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
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname,'public')));

app.use(routes); // find right path to routes 

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`App listening ${PORT}`));
});