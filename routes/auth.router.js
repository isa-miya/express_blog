const router = require('express').Router();

const { getLogin, postLogin, getSignup, postSignup, postLogout } = require('../controllers/auth.controller');

router.get('/login', getLogin);
router.post('/login', postLogin);

router.get('/signup', getSignup);
router.post('/signup', postSignup);

router.post('/logout', postLogout);

module.exports = router;