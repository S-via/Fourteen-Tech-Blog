// entry point 

const router = require('express').Router();
const {User, Comment } = require('../../models'); // BUG
// with aunth variable goes here !!!

// get comments  
router.get('/', async (req, res) => {
    try {
        const commentData = await Comment.findAll({
            include: [{
                model: User,
                attributes: ['username']
            }]
        })
        const comments = commentData.map((comments) => comments.get({ plain: true }));
        res.status(200).json(comments);
    } catch (err) {
        res.status(500).json(err);
    }
})

// post new comment by id 

router.post ('/',withAuth,async (req,res)=>{
    try{
        const newComment = await Comment.create({
            ...req.body,
            user_id: req.session.user_id,

        });
        res.status(200).json(newComment);
    } catch (err){
        res.status(500).json(err);
    }
})
//delte new comment by id 
router.delete('/:id',withAuth, async(req,res)=>{
    try{
        const commentData = await Comment.destroy({
            where:{
                id:req.params.id,
                user_id:req.session.user_id,
            }
        });
        if(!commentData){
            res.status(404).json({message:'no comment found'});
            return;
        }
    } catch (err){
        res.status(500).json(err);
    }
})
module.exports = router;