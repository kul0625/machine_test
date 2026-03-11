const router = require('express').Router();
const { captcha, login, me, logout, register } = require('../controllers/authController');
const { requireAuth } = require('../middleware/auth');

router.get('/captcha', captcha);
router.post('/login', login);
router.post('/logout', logout);
router.get('/me', requireAuth, me);
router.post('/register', requireAuth, register);

module.exports = router;
