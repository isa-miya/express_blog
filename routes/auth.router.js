const router = require('express').Router();

const { getLogin, getSignup } = require('../controllers/auth.controller');

router.get('/login', getLogin);

router.get('/signup', getSignup);

module.exports = router;