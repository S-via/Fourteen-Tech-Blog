// if user not logged in, redirect them 

const withAuth = (req,res,next) =>{
    if (!req.session.loggedIn){ 
        res.redirect('/');

    }else {
        next();
    }
};
module.exports = withAuth;

