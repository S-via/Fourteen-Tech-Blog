// entry point from Model
const router = require('express').Router();
const { User, Blog, Comment } = require('../../models');



////// create route for users to signup /////
router.post('/signup', async (req, res) => {
    try {
        const newuserData = await User.create({
            username: req.body.username,
            password: req.body.password,
        });

        req.session.save(() => {
            req.session.user_id = newuserData.id;
            req.session.logged_in = true;
            res.redirect('/dashboard')
        });
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: err })
    }
})

//// create route for users to login ////
router.post('/login', async (req, res) => {
    console.log(req.body)
    try {
        const userData = await User.findOne({
            where: {
                username: req.body.username
            },
            attributes: ['id', 'username', 'password'],
        });
        // if no username return error
        if (!userData) {
            res.status(400).json({ message: 'invalid' })
            return;
        }

        const validatepassword = await userData.checkPassword(req.body.password);
        // return error if password in incorrect
        if (!validatepassword) {
            res.status(400).json({ message: 'invalid' })
            return;
        }
        // if user data is correct save data 
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;
            res.redirect('/dashboard')

        });
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
}
)


//// create route .post to loggout //// NOT WORKING !!!!
router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(200).end()
        })

    } else {
        res.status(400).end();
    }
})
module.exports = router;
