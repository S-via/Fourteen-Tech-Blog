// entry point for models
const router = require('express').Router();
const { User, Blog, Comment } = require('../models/');

// with auth variable goes here !!

// get homepage with all blog post 
router.get('/', async (req, res) => {
    try {
        const blogData = await Blog.findAll({
            include: [{
                model: User,
                attribute: ['username']
            }]
        })
        const blogs = blogData.map((blog) => blog.get({ plain: true }));
        res.render('homepage', {
            blogs,
            logged_in: req.session.logged_in
        })
        res.status(200).json(blogs);
    } catch (err) {
        res.status(500).json(err);
    }
})
//get blog post by id 
router.get('/blog/:id', async (req, res) => {
    try {
        const blogData = await Blog.findByPk(req.params.id, {
            include: [{
                model: User,
                attributes: ['username'],
            },
            {
                model: Comment,
                include: [User],

            }]

        })
        if (!blogData) {
            res.status(404).json({ message: 'nlo blog found' })
            return;
        }
        const blogs = blogData.get({ plain: true })
        res.render('single-post', {
            blogs,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err);
    }
})
// get login
router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/profile');
        return;
    }
    res.render('login');
});

// get profile 
router.get('/profile', async (req, res) => {
    try {
        if (!req.session.logged_in) {
            res.redirect('/login');
            return;
        }
        const userData = await User.findByPk(req.session.user_id, {
            include: [{
                model: Blog
            }]
        })
        const user = userData.get({ plain: true });
        res.render('profile', {
            ...user,
            logged_in: true,
        });
    } catch (err) {
        res.status(500).json(err);

    }

});
module.exports = router;