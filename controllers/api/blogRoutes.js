// entry point from Model

const router = require('express').Router();
const { Blog, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');


//// create new blog post ////
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

//// route for put ////
router.put('/update/:post_id', async (req, res) => {
    try {
        const updateBlog = await Blog.update(
            {
                title: req.body.title,
                content: req.body.content

            },
            {
                where: {
                    id: req.params.post_id
                }
            }
        );
        res.status(200).json(updateBlog);
    } catch (err) {
        console.log(err)
        {
            res.status(400).json(err);
        }
    }
})

// POST - '/logout' route /// DO I NEED IT ??
/* router.post('/logout', withAuth, (req, res) => {
    req.session.destroy(() => {
        res.status(200).end();
    });
}); */

// DELETE blog by id 

router.delete('/delete/:post_id', async (req, res) => {
    try {
        const deleteBlog = await Blog.destroy({

            where: {
                id: req.params.post_id
            }
        });
        res.status(200).json(deleteBlog);
    } catch (err) {
        console.log(err)
        {
            res.status(400).json(err);
        }
    }
})


module.exports = router;

