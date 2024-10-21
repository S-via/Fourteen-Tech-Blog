// entry point 

const router = require('express').Router();
const {User, Comment } = require('../../models'); // BUG
const withAuth = require('../../utils/auth');


module.exports = router;