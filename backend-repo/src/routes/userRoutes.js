const router = require('express').Router();
const { listNextLevel, downline, changePassword } = require('../controllers/userController');

router.get('/next-level', listNextLevel);
router.get('/downline/:userId?', downline);
router.patch('/:userId/password', changePassword);

module.exports = router;
