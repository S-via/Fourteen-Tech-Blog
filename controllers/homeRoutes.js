// entry point for models
const sequelize = require('../config/connection')
const router = require('express').Router();
const { User, Blog, Comment } = require('../models/');
const withAuth = require('../../utils/auth');

// get homepage with all blog post 
router.get('/', async (req, res) => {
    try {
        const blogData = await Blog.findAll({
            //attribute:["","",""],
            include: [{
                model: User,
                attribute: ['username']
            }]
        })
        const blogs = blogData.map((blog) => blog.get({ plain: true }));
        res.render('homepage', {
            blogs,
            loggedIn: req.session.loggedIn
        })

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
            res.status(404).json({ message: 'no blog found' })
            return;
        }
        const blogs = blogData.get({ plain: true })
        res.render('singleblog', {
            blogs,
            loggedIn: req.session.loggedIn,
        });
    } catch (err) {
        res.status(500).json(err);
    }
})
// get login route to 
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

// get signup route 
router.get('/signup', (req, res) => {
    res.render('signup');
});

// get blog route with auth for logged in user that renders to dashboard 
router.get('/', withAuth, async (req, res) => {
    try {
        const blogwId = await Blog.findAll({
            where: {
                user_id: req.session.user_id
            },
            attributes: ['id', 'title', 'content',],
            include: {
                model: User,
                attributes: ['username']
            },
            include: [{
                model: Comment,
                attributes: ['id', 'comments', 'blog_id', 'user_id'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            }]
        })
        const blogs = blogwId.map((blog) => blog.get({ plain: true }))
        res.render('dashboard', {
            blogs,
            loggedIn: req.session.loggedIn

        })

    } catch (err) {
        res.status(500).json(err)
    }
})

// get blogs by id for user to edit 
router.get('/update/:id', withAuth, async (req, res) => {
    try {
        const updateBlog = await Blog.findOne({
            where: {
                id: req.params.id
            },
            attributes: ['id', 'title', 'content'],
            include: [
                {
                    model: User,
                    attributes: ['username']
                }],
            include: [{
                model: Comment,
                attributes: ['id', 'comments', 'blog_id', 'user_id'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            }]
        })
        const blog = updateBlog.get({ plain: true })
        res.render('update', {
            blog,
            loggedIn: req.session.loggedIn

        })

    } catch (err) {
        res.status(500).json(err)
    }
})
// get route for user to add new blog
router.get('/new', (req, res) => {
    res.render('blog');
});
module.exports = router;