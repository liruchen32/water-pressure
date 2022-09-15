module.exports = (app) => {
  const { Sequelize, model } = app;

  const ExperimentResults = model.define('experiment_results', {
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
      type: Sequelize.STRING(225),
      allowNull: false
    },
    benta_mov_avg: {
      type: Sequelize.DOUBLE
    },
    merra_mov_avg: {
      type: Sequelize.DOUBLE
    }
  }, {
    freezeTableName: true,
    timestamps: false,
    underscored: true,
    charset: 'utf8mb4',
    paranoid: false
  });

  ExperimentResults.associate = (models) => {
    const { Experiments } = models;

    ExperimentResults.belongsTo(Experiments, {
      foreignKey: 'exp_customize_id'
    });
  };

  return ExperimentResults;
};
