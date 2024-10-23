// export blog , comment, user Routes
const router = require('express').Router();

const blogRoutes = require('./blogRoutes');
const userRoutes = require('./userRoutes');
const commentRoutes = require('./commentRoutes');
const dashboardRoutes = require('./dashboardRoutes');

router.use('/blogs',blogRoutes);
router.use('/users',userRoutes);
router.use('/comments',commentRoutes);
router.use('/dashboard',dashboardRoutes);

module.exports = router;
