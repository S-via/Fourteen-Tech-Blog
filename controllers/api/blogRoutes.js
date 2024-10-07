// entry point from Model

const router = require('express').Router();
const { Blog, User, Comment } = require('../../models'); //BUG 
// with aunth varibale goes here !!!

// get blogs
router.get('/', async (req, res) => {
    try {
        const blogData = await Blog.findAll({
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
            ],
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
});

//get by id with user and comment
router.get('/:id', async (req, res) => {
    try {
        const blogData = await Blog.findByPk(req.params.id,{
            include: [{
                model: User,
                attributes: ['username'],
            },
            {
                model: Comment,
                include: {
                    model: User,
                    attributes: ['username']
                }
            }]
        })
        if (!blogData) {
            res.status(404).json({ message: 'no blog found' });
            return;
        }
        const blogs = blogData.get({ plain: true });
        res.status(200).json(blogs);
    } catch (err) {
        res.status(500).json(err);
    }
})
// post new blog for logged in user
router.post('/', withAuth, async (req, res) => {
    try {
        const newBlog = await Blog.create({
            ...req.body,
            user_id: req.session.user_id,
        });
        res.status(200).json(newBlog);

    } catch (err) {
        res.status(500).json(err);
    }
})

// .put update blog  for looged in users
router.put('/:id', withAuth, async (req, res) => {
    try {
        const blogData = await Blog.update(req.body, {
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            }
        });
        if (!blogData) {
            res.status(404).json({ message: 'no blog found' });
            return;
        }
        res.status(200).json(blogData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// delete post 
router.delete('/:id',withAuth, async(req,res)=>{
    try{
        const blogData = await Blog.destroy({
            where:{
                id:req.params.id,
                user_id: req.session.user_id,
            }
        });
        if(!blogData){
            res.status(404).json({message:'no blog found'});
            return;
        }
        res.status(200).json(blogData);

    } catch (err){
        res.status(500).json(err);
    }
});

module.exports = router;

