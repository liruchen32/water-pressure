module.exports = (app) => {
  const { Sequelize, model } = app;

  const Experiments = model.define('experiments', {
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
  }, {
    freezeTableName: true,
    timestamps: false,
    underscored: true,
    charset: 'utf8mb4',
    paranoid: false
  });

  Experiments.associate = (models) => {
    const { ExperimentResults } = models;

    Experiments.hasMany(ExperimentResults, {
      foreignKey: 'exp_customize_id'
    });
  };

  return Experiments;
};
