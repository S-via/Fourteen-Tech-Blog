// entry point from Model

const router = require('express').Router();
const { Blog, User, Comment } = require('../../models');  
const withAuth = require('../../utils/auth');


/* router.get('/', withAuth, async (req, res) => {
    try {
        // get username to display on blogs view (passed in res.render below)
        const user = await User.findByPk(req.session.user_id, {
          attributes: ["username"],
        });
        // use optional chaining to access username property
        const name = user?.username;

        const blogData = await Blog.findAll({
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
            ]
        });
        // serialize data
        const blogposts = blogData.map((blogpost) => blogpost.get({ plain: true }));
        res.render('homepage', {
            blogposts,
            logged_in: req.session.logged_in,
            name
        })

    } catch (err) {
        res.status(500).json(err);
    }

});

// create new blog post
router.post('/', withAuth, async (req, res) => {
    try {
        // create new post and associate with logged in user
        const newBlog = await Blog.create({
            ...req.body,
            user_id: req.session.user_id,
        });
        // respond with new blog post
        res.status(200).json(newBlog);
    } catch (err) {
        res.status(400).json(err);
    }
 });
 
// POST - '/logout' route
router.post('/logout', withAuth, (req, res) => {
        req.session.destroy(() => {
            res.status(200).end();
        });   
}); */


module.exports = router;

