const Logger = require('../../libs/logger');
const validator = require('../../libs/validator');
const Service = require('../services');

const ExperimentResultsController = {
  async addExperimentResult(req, res) {
    const { body } = req;
    const rule = {
      exp_customize_id: {
        type: 'string'
      },
      time: {
        type: 'string'
      },
      benta: {
        type: 'number'
      },
      merra: {
        type: 'number'
      },
      image_url: {
        type: 'string'
      }
    };

    try {
      validator.validate(body, rule);
      const result = await Service.experimentResults.create(body);
      res.json(result);
    } catch (error) {
      Logger.error(error);
      res.status(400).json({ message: error.message });
    }
  },

  async modifyExperimentResult(req, res) {
    const { body } = req;
    const rule = {
      id: {
        type: 'number'
      }
    };

    try {
      validator.validate(body, rule);
      const { id, ...mutationData } = body;
      const result = await Service.experimentResults.update(id, mutationData);
      res.json(result);
    } catch (error) {
      Logger.error(error);
      res.status(400).json({ message: error.message });
    }
  },

  async removeExperimentResult(req, res) {
    const { body } = req;
    const rule = {
      id: {
        type: 'number'
      }
    };

    try {
      validator.validate(body, rule);
      const { id } = body;
      const result = await Service.experimentResults.delete(id);
      res.json(result);
    } catch (error) {
      Logger.error(error);
      res.status(400).json({ message: error.message });
    }
  },

  async getResultsByExpCustomizetId(req, res) {
    const { body } = req;
    const rule = {
      exp_customize_id: {
        type: 'string'
      }
    };

    try {
      validator.validate(body, rule);
      const { exp_customize_id } = body;
      const result = await Service.experimentResults.findByExpCustomizetId(exp_customize_id);
      res.json(result);
    } catch (error) {
      Logger.error(error);
      res.status(400).json({ message: error.message });
    }
  },

  async addExperimentResults(req, res) {
    const { body } = req;
    const rule = {
      exp_customize_id: {
        type: 'string'
      }
    };

    try {
      validator.validate(body, rule);
      const { exp_customize_id, data } = body;
      const result = await Service.experimentResults.bulkCreate(exp_customize_id, data);
      res.json(result);
    } catch (error) {
      Logger.error(error);
      res.status(400).json({ message: error.message });
    }
  }
};

module.exports = ExperimentResultsController;
