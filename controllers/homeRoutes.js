// entry point for models
const sequelize = require('../config/connection')
const router = require('express').Router();
const { User, Blog, Comment } = require('../models/');
/* const withAuth = require('../../utils/auth'); */

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
router.get('/signup', (req,res)=>{
        res.render('signup');
});


module.exports = router;