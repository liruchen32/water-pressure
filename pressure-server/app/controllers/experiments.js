const Logger = require('../../libs/logger');
const validator = require('../../libs/validator');
const Service = require('../services');

const ExperimentsController = {
  async addExperiment(req, res) {
    const { body } = req;
    const rule = {
      customize_id: {
        type: 'string'
      },
      pressure: {
        type: 'number'
      },
      trial: {
        type: 'number'
      },
      date: {
        type: 'string'
      },
      cl_name: {
        type: 'string'
      },
      cornea: {
        type: 'string'
      }
    };

    try {
      validator.validate(body, rule);
      const result = await Service.experiments.create(body);
      res.json(result);
    } catch (error) {
      Logger.error(error);
      res.status(400).json({ message: error.message });
    }
  },

  async modifyExperiment(req, res) {
    const { body } = req;
    const rule = {
      id: {
        type: 'number'
      }
    };

    try {
      validator.validate(body, rule);
      const { id, ...mutationData } = body;
      const result = await Service.experiments.update(id, mutationData);
      res.json(result);
    } catch (error) {
      Logger.error(error);
      res.status(400).json({ message: error.message });
    }
  },

  async removeExperiment(req, res) {
    const { body } = req;
    const rule = {
      id: {
        type: 'number'
      }
    };

    try {
      validator.validate(body, rule);
      const { id } = body;
      const result = await Service.experiments.delete(id);
      res.json(result);
    } catch (error) {
      Logger.error(error);
      res.status(400).json({ message: error.message });
    }
  },

  async getAllExperiments(req, res) {
    try {
      const result = await Service.experiments.findAll();
      res.json(result);
    } catch (error) {
      Logger.error(error);
      res.status(400).json({ message: error.message });
    }
  },

  async getAllExperimentDate(req, res) {
    try {
      const result = await Service.experiments.findAllExperimentDate();
      res.json(result);
    } catch (error) {
      Logger.error(error);
      res.status(400).json({ message: error.message });
    }
  },

  async getAllCl(req, res) {
    try {
      const result = await Service.experiments.findAllCl();
      res.json(result);
    } catch (error) {
      Logger.error(error);
      res.status(400).json({ message: error.message });
    }
  },

  async getAllCornea(req, res) {
    try {
      const result = await Service.experiments.findAllCornea();
      res.json(result);
    } catch (error) {
      Logger.error(error);
      res.status(400).json({ message: error.message });
    }
  },

  async getAllClByDate(req, res) {
    const { body } = req;
    const rule = {
      date: {
        type: 'string'
      }
    };

    try {
      validator.validate(body, rule);
      const { date } = body;
      const result = await Service.experiments.findAllClByDate(date);
      res.json(result);
    } catch (error) {
      Logger.error(error);
      res.status(400).json({ message: error.message });
    }
  },

  async getAllPressureByDateAndCl(req, res) {
    const { body } = req;
    const rule = {
      date: {
        type: 'string'
      },
      cl_name: {
        type: 'string'
      }
    };

    try {
      validator.validate(body, rule);
      const { date, cl_name } = body;
      const result = await Service.experiments.findAllPressureByDateAndCl(date, cl_name);
      res.json(result);
    } catch (error) {
      Logger.error(error);
      res.status(400).json({ message: error.message });
    }
  },

  async getAllTrialByDateAndClAndPressure(req, res) {
    const { body } = req;
    const rule = {
      date: {
        type: 'string'
      },
      cl_name: {
        type: 'string'
      },
      pressure: {
        type: 'number'
      }
    };

    try {
      validator.validate(body, rule);
      const { date, cl_name, pressure } = body;
      const result = await Service.experiments.findAllTrialByDateAndClAndPressure(date, cl_name, pressure);
      res.json(result);
    } catch (error) {
      Logger.error(error);
      res.status(400).json({ message: error.message });
    }
  },

  async getExperimentByCondition(req, res) {
    const { body } = req;
    const rule = {
      date: {
        type: 'string'
      },
      cl_name: {
        type: 'string'
      },
      pressure: {
        type: 'number'
      },
      trial: {
        type: 'number'
      }
    };

    try {
      validator.validate(body, rule);
      const {
        date, cl_name, pressure, trial
      } = body;
      const result = await Service.experiments.findExperimentByCondition(date, cl_name, pressure, trial);
      res.json(result);
    } catch (error) {
      Logger.error(error);
      res.status(400).json({ message: error.message });
    }
  }

};

module.exports = ExperimentsController;
