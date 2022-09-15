const express = require('express');

const router = express.Router();
const ExperimentsController = require('../controllers/experiments');

router.post('/getAllExperiments', ExperimentsController.getAllExperiments);
router.post('/add', ExperimentsController.addExperiment);
router.post('/modify', ExperimentsController.modifyExperiment);
router.post('/remove', ExperimentsController.removeExperiment);
router.post('/getAllExperimentDate', ExperimentsController.getAllExperimentDate);
router.post('/getAllCl', ExperimentsController.getAllCl);
router.post('/getAllCornea', ExperimentsController.getAllCornea);
router.post('/getAllClByDate', ExperimentsController.getAllClByDate);
router.post('/getAllPressureByDateAndCl', ExperimentsController.getAllPressureByDateAndCl);
router.post('/getAllTrialByDateAndClAndPressure', ExperimentsController.getAllTrialByDateAndClAndPressure);
router.post('/getExperimentByCondition', ExperimentsController.getExperimentByCondition);

module.exports = router;
