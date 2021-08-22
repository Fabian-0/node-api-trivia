const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(DATABASE_URL);

sequelize.authenticate()
  .then(res => console.log('Connection has been established successfully.'))
  .catch(error => console.error('Unable to connect to the database:', error.message));

module.exports = sequelize;