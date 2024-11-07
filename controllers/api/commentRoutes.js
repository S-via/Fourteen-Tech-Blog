// entry point 

const router = require('express').Router();
const {User, Comment, Blog } = require('../../models'); // BUG
const withAuth = require('../../utils/auth');

// add logic to add a comment 
router.post('/',async (req,res) => {
    try {
        const commentData = await Comment.create({
            ...req.body,
            user_id:req.session.user_id,
            
        });
        
        res.send(200).json()
    } catch (err) {
        console.log(err)
        res.status(400).json(err)
    }
});
module.exports = router;