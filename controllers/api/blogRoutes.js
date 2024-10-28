// entry point from Model

const router = require('express').Router();
const { Blog, User, Comment } = require('../../models');  
const withAuth = require('../../utils/auth');


// create new blog post ??????????????
router.post('/newpost', withAuth, async (req, res) => {
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
 
// POST - '/logout' route /// DO I NEED IT ??
router.post('/logout', withAuth, (req, res) => {
        req.session.destroy(() => {
            res.status(200).end();
        });   
}); 


module.exports = router;

