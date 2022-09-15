const Model = require('../models');
const Logger = require('../../libs/logger');
const ExperimentsService = require('./experiments');

const ExperimentResultsService = {
  async create(mutationData) {
    const { exp_customize_id } = mutationData;
    const isExpExist = await ExperimentsService.findByCustomizeId(exp_customize_id);
    if (!isExpExist) throw new Error('[ExperimentResultsService::create] experiment not exist');
    const newResult = await Model.ExperimentResults.create(mutationData);
    Logger.info('[ExperimentResultsService::create] created successfully.');
    return newResult;
  },

  async update(id, mutationData) {
    const targetResult = await this.findById(id);
    if (!targetResult) throw new Error('[ExperimentResultsService::update] result not exist');
    const { exp_customize_id } = mutationData;
    const isExpExist = await ExperimentsService.findByCustomizeId(exp_customize_id);
    if (!isExpExist) throw new Error('[ExperimentResultsService::update] experiment not exist');
    const result = await targetResult.update({ ...mutationData });
    return result;
  },

  async delete(id) {
    const targetResult = await this.findById(id);
    if (!targetResult) throw new Error('[ExperimentResultsService::delete] result not exist');
    await targetResult.destroy();
    return { success: true };
  },

  async findById(id) {
    const result = await Model.ExperimentResults.findByPk(id);
    return result;
  },

  async findByExpCustomizetId(exp_customize_id) {
    const isExpExist = await ExperimentsService.findByCustomizeId(exp_customize_id);
    if (!isExpExist) throw new Error('[ExperimentResultsService::findByExperimentId] experiment not exist');
    const result = await Model.ExperimentResults.findAll({
      where: {
        exp_customize_id
      },
      order: [['time', 'ASC']]
    });
    return result;
  },

  async bulkCreate(exp_customize_id, mutationData) {
    const isExpExist = await ExperimentsService.findByCustomizeId(exp_customize_id);
    if (!isExpExist) throw new Error('[ExperimentResultsService::bulkCreate] experiment not exist');
    const bulkCreateData = mutationData.map((data) => ({ exp_customize_id, ...data }));
    const result = await Model.ExperimentResults.bulkCreate(bulkCreateData);
    return result;
  }
};

module.exports = ExperimentResultsService;
