module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      'experiment_results',
      'benta_mov_avg',
      {
        type: Sequelize.DOUBLE,
        after: 'image_url'
      }
    );
    await queryInterface.addColumn(
      'experiment_results',
      'merra_mov_avg',
      {
        type: Sequelize.DOUBLE,
        after: 'benta_mov_avg'
      }
    );
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn(
      'experiment_results',
      'benta_mov_avg'
    );
    await queryInterface.removeColumn(
      'experiment_results',
      'merra_mov_avg'
    );
  }
};
