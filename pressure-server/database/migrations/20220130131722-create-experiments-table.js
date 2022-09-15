module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('experiments', {
      id: {
        primaryKey: true,
        type: Sequelize.INTEGER(10).UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        unique: true
      },
      customize_id: {
        type: Sequelize.STRING(45),
        allowNull: false,
        unique: true
      },
      date: {
        type: Sequelize.DATE,
        allowNull: false
      },
      pressure: {
        type: Sequelize.INTEGER(10).UNSIGNED,
        allowNull: false
      },
      trial: {
        type: Sequelize.INTEGER(10).UNSIGNED,
        defaultValue: 1,
        allowNull: false
      },
      cl_name: {
        type: Sequelize.STRING(45),
        allowNull: false
      },
      cornea: {
        type: Sequelize.STRING(45),
        allowNull: false
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('experiments');
  }
};
