module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('experiment_results', {
      id: {
        primaryKey: true,
        type: Sequelize.INTEGER(10).UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        unique: true
      },
      exp_customize_id: {
        type: Sequelize.STRING(45),
        allowNull: false,
        references: {
          model: 'experiments',
          key: 'customize_id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      },
      time: {
        type: Sequelize.INTEGER(10).UNSIGNED,
        defaultValue: 1,
        allowNull: false
      },
      benta: {
        type: Sequelize.DOUBLE,
        allowNull: false
      },
      merra: {
        type: Sequelize.DOUBLE,
        allowNull: false
      },
      image_url: {
        type: Sequelize.STRING(225)
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('experiment_results');
  }
};
