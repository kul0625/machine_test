const router = require('express').Router();
const { ownerSelfRecharge, creditNextLevel, statement } = require('../controllers/balanceController');

router.post('/self-recharge', ownerSelfRecharge);
router.post('/transfer', creditNextLevel);
router.get('/statement', statement);

module.exports = router;
