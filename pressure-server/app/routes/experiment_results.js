const express = require('express');

const router = express.Router();
const ExperimentResultsController = require('../controllers/experiment_results');

router.post('/getResultsByExpCustomizetId', ExperimentResultsController.getResultsByExpCustomizetId);
router.post('/add', ExperimentResultsController.addExperimentResult);
router.post('/modify', ExperimentResultsController.modifyExperimentResult);
router.post('/remove', ExperimentResultsController.removeExperimentResult);
router.post('/addResults', ExperimentResultsController.addExperimentResults);

module.exports = router;
