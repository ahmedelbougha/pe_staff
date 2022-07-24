const express = require('express');

const router = express.Router();

// isAuthMiddleware
const isAuthMiddleware = require('../middleware/is-auth');
// staff controller
const statisticsController = require('../controllers/statistics');

// routes (all started with /statistics but it shows only the sub-routes here)
router.get('/staff', isAuthMiddleware, statisticsController.getStaffStatistics);
router.get('/staff/contracts', isAuthMiddleware, statisticsController.getContractedStatistics);
router.get('/departments', isAuthMiddleware, statisticsController.getDepartmentStatistics);
router.get('/sub-departments', isAuthMiddleware, statisticsController.getSubDepartmentStatistics);

module.exports = router;