const router = require('express').Router();
const { nextLevelUsers, hierarchy, creditAny, balanceSummary } = require('../controllers/adminController');
const { requireRole } = require('../middleware/auth');

router.use(requireRole('OWNER', 'ADMIN'));
router.get('/next-level', nextLevelUsers);
router.get('/hierarchy/:userId', hierarchy);
router.post('/credit/:userId', creditAny);
router.get('/balance-summary', balanceSummary);

module.exports = router;
