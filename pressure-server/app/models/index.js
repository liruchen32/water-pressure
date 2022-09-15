const Sequelize = require('sequelize');
const Logger = require('../../libs/logger');

// Load model files
const Experiments = require('./experiments');
const ExperimentResults = require('./experiment_results');

const db = {
  Experiments,
  ExperimentResults
};

const sequelize = new Sequelize(
  'water_pressure',
  'root',
  'password',
  {
    host: 'pressure_mysql',
    dialect: 'mysql',
    logging: (message) => Logger.debug(`[Sequelize] ${message}`)
  }
);

// Check connection to Database
(async () => {
  try {
    await sequelize.authenticate();
    Logger.info('Sequelize connection has been established successfully.');
  } catch (error) {
    Logger.error('Sequelize connection failed:', error);
  }
})();

// Add model.define
// Object.keys(db).forEach((modelName) => {
//   console.log('modelName: ', modelName);
//   db[modelName] = db[modelName]({ Sequelize, model: sequelize });
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });

// Add all model defines here
Object.keys(db).forEach((key) => {
  db[key] = db[key]({ Sequelize, model: sequelize });
});
Object.keys(db).forEach((key) => {
  // eslint-disable-next-line no-unused-expressions
  typeof db[key].associate === 'function' && db[key].associate(db);
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = {
  ...db,
  sequelize
};
