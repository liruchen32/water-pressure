const express = require('express');

const router = express.Router();

const ExperimentsRouter = require('./experiments');
const ExperimentResultsRouter = require('./experiment_results');

// experiments routes
router.use('/experiments', ExperimentsRouter);

// experiment results routers
router.use('/experimentResults', ExperimentResultsRouter);

module.exports = router;
