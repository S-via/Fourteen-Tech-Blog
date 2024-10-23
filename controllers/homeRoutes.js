// entry point for models
const router = require('express').Router();
const { User, Blog, Comment } = require('../models/');
const withAuth = require('../utils/auth');

//// get blogs data ////
router.get('/',async(req,res)=>{
        const blogdata = await Blog.findAll({
            include:[
                {
                    model: User,
                    attributes: ['username'] // Fetch the username
                }
            ]}
        );

        // serilize data and only get the info we need
        const blogposts = blogdata.map(data => data.get({plain:true}))
        console.log(blogposts);

        // pass blogpost data 
        res.render('homepage',{
            blogposts: blogposts,
            logged_in: req.session.logged_in
        })
    });

    //// get signup route and render to signup page ////
    router.get('/signup',(req,res)=>{
        res.render('signup')
    });
    
    //// get login route and render to login page ////
    router.get('/login',(req,res)=>{
        if(req.session.logged_in){
            res.redirect('/dashboard');
        } else {
        res.render('login');
    }
    });

    //// get dashboard route if user is loggedin ////



module.exports = router;