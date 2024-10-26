// if user not logged in, redirect them 

const withAuth = (req,res,next) =>{
    if (!req.session.logged_in){ 
        res.redirect('/login');

    }else {
        next();
    }
};
module.exports = withAuth;

