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
router.get('/dashboard', async (req, res) => {
    if (req.session.logged_in) {
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
    } else {
        res.redirect("/login")
    }

})

// get newpost route
router.get('/new', (req, res) => {
    res.render('newpost');
})

// update post route
router.get('/update/:post_id', async (req, res) => {
    const blogdata = await Blog.findByPk
    ( req.params.post_id,
        {
            include: [
                {
                    model: User,
                    attributes: ['username'] // Fetch the username
                }
            ]
        }
    );
console.log(blogdata)
    // serilize data and only get the info we need
    const blogpost = blogdata.get({ plain: true });

    res.render('update', {
        blogpost
    });
})




module.exports = router;