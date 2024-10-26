// entry point for models
const router = require('express').Router();
const { User, Blog, Comment } = require('../models/');
const withAuth = require('../utils/auth');

//// get blogs data ////
router.get('/', async (req, res) => {
    const blogdata = await Blog.findAll({
        include: [
            {
                model: User,
                attributes: ['username'] // Fetch the username
            }
        ]
    }
    );

    // serilize data and only get the info we need
    const blogposts = blogdata.map(data => data.get({ plain: true }))
    console.log(blogposts);

    // pass blogpost data to homepage.hdb
    res.render('homepage', {
        blogposts: blogposts,
        logged_in: req.session.logged_in
    })
});

//// get signup route and render to signup page ////
router.get('/signup', (req, res) => {
    res.render('signup')
});

//// get login route and render to login page ////
router.get('/login', (req, res) => {
    if (!req.session.logged_in) {
        return res.render('login');
    }

});

//// get dashboard route if user is loggedin ////
router.get('/dashboard', withAuth, async (req, res) => {

    const blogdata = await Blog.findAll({
        where: {
            user_id: req.session.user_id
        },
        include: [{
            model: User,
            attributes: ['username']
        }]

    })
    const userposts = blogdata.map(data => data.get({ plain: true }));
    console.log(userposts);

    res.render('dashboard', {
        userposts: userposts,
        logged_in: req.session.logged_in
    });
})




module.exports = router;