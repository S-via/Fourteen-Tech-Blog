// entry point for models

const router = require('express').Router();
const { User, Blog, Comment } = require('../models/');
const withAuth = require('../utils/auth');
//// get homepage ////

module.exports = router;