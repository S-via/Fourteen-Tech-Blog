// entry point from Model
const router = require('express').Router();
const { User, Blog, Comment } = require('../../models');

//GET /api/users
router.get('/', async (req, res) => {
    try {
        const userData = await User.findAll();
        res.status(200).json(userData);
    } catch (err) {
        res.status(500).json({ message: 'failed' })
    }
}),
    //GET by user/:id 
    router.get('/:id', async (req, res) => {
        try {
            const userData = await User.findByPk({
                where: {
                    id: req.params.id,
                },
                include: [{
                    model: Blog,
                    attributes: [
                        'id',
                        'title',
                        'content',

                    ]
                }, {
                    model: Comment,
                    attributes: ['id', 'comment'],
                    include: {
                        model: Blog,
                        attributes: ['title'],
                    }
                }]
            });
            if (!userData) {
                return res.status(404).json({ message: 'not found' })
            }
            const user = userData.get({ plain: true })
            res.status(200).json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    })
    
// POST api/users/signup 
// create username and password?
router.post('/signup', async (req, res) => {
    try {
        const userData = await User.create(req.body);
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.status(200).json(userData);
        });
    } catch (err) {
        res.status(400).json(err);
    }
});
// POST api/user/login 

router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({ where: { username: req.body.username } });
        if (!userData) {
            res.status(400)
                .json({ message: 'Incorrect please try again' });
            return;
        }

        const validPass = await userData.checkPassword(req.body.password);

        if (!validPass) {
            res.status(400).json({ message: 'Incorrect please try again' });
            return;
        }
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.json({ user: userData, message: 'Logged in!' })
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

// POST api/user/logout 

router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});
module.exports = router;
