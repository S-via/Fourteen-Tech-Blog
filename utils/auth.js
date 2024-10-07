// if user not logged in, redirect them 
const withAuth = (req,res,next) =>{
    if (!req.session.logged_id){
        res.direct('/login');

    }else {
        next();
    }
};
module.exports = withAuth;

