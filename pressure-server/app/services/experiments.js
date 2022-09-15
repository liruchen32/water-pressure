const { Sequelize } = require('sequelize');
const Model = require('../models');
const Logger = require('../../libs/logger');

const ExperimentsService = {
  async create(mutationData) {
    const newExperiment = await Model.Experiments.create(mutationData);
    Logger.info('[ExperimentsService::create] created successfully.');
    return newExperiment;
  },

  async update(id, mutationData) {
    const targetExp = await this.findById(id);
    if (!targetExp) throw new Error('[ExperimentsService::update] targe not exist');
    const result = await targetExp.update({ ...mutationData });
    return result;
  },

  async delete(id) {
    const targetExp = await this.findById(id);
    if (!targetExp) throw new Error('[ExperimentsService::delete] targe not exist');
    await Model.ExperimentResults.destroy({
      where: {
        exp_customize_id: targetExp.get('customize_id')
      }
    });
    await targetExp.destroy();
    return { success: true };
  },

  async findById(id) {
    const result = await Model.Experiments.findByPk(id);
    return result;
  },

  async findByCustomizeId(customize_id) {
    const result = await Model.Experiments.findOne({
      where: { customize_id }
    });
    return result;
  },

  async findAll() {
    const result = await Model.Experiments.findAll(
      {
        order: [['date', 'DESC']]
      }
    );
    return result;
  },

  async findAndCountAllByCondition(condition) {
    // TODO: no need right now
  },

  // async findAllByCondition(condition) {
  //   const {
  //     date = null, cl_name = null, pressure = null, trial = null, cornea = null
  //   } = condition;

  //   const result = await Model.Experiments.findAll(
  //     {
  //       where: { ...condition }
  //     }
  //   );
  //   return result;
  // },

  async findAllCl() {
    const result = await Model.Experiments.findAll(
      {
        attributes: [
          'cl_name',
          [Sequelize.fn('COUNT', Sequelize.col('id')), 'total_exp']
        ],
        order: [['cl_name', 'DESC']],
        group: ['cl_name']
      }
    );
    return result;
  },

  async findAllCornea() {
    const result = await Model.Experiments.findAll(
      {
        attributes: [
          'cornea',
          [Sequelize.fn('COUNT', Sequelize.col('id')), 'total_exp']
        ],
        order: [['cornea', 'DESC']],
        group: ['cornea']
      }
    );
    return result;
  },

  async findAllExperimentDate() {
    const result = await Model.Experiments.findAll(
      {
        attributes: [
          'date',
          [Sequelize.fn('COUNT', Sequelize.col('id')), 'total_exp']
        ],
        order: [['date', 'DESC']],
        group: ['date']
      }
    );
    return result;
  },

  async findAllClByDate(date) {
    const result = await Model.Experiments.findAll(
      {
        where: {
          date
        },
        attributes: [
          'cl_name',
          [Sequelize.fn('COUNT', Sequelize.col('id')), 'total_exp']
        ],
        order: [['cl_name', 'DESC']],
        group: ['cl_name']
      }
    );
    return result;
  },

  async findAllPressureByDateAndCl(date, cl_name) {
    const result = await Model.Experiments.findAll(
      {
        where: {
          date,
          cl_name
        },
        attributes: [
          'pressure',
          [Sequelize.fn('COUNT', Sequelize.col('id')), 'total_exp']
        ],
        order: [['pressure', 'DESC']],
        group: ['pressure']
      }
    );
    return result;
  },

  async findAllTrialByDateAndClAndPressure(date, cl_name, pressure) {
    const result = await Model.Experiments.findAll(
      {
        where: {
          date,
          cl_name,
          pressure
        },
        attributes: [
          'trial',
          [Sequelize.fn('COUNT', Sequelize.col('id')), 'total_exp']
        ],
        order: [['trial', 'ASC']],
        group: ['trial']
      }
    );
    return result;
  },

  async findExperimentByCondition(date, cl_name, pressure, trial) {
    const result = await Model.Experiments.findOne(
      {
        where: {
          date,
          cl_name,
          pressure,
          trial
        }
      }
    );
    return result;
  }
};

module.exports = ExperimentsService;
