const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(process.env.DATADABASE_URL, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: true
  }
});

sequelize.authenticate()
  .then(res => console.log('Connection has been established successfully.'))
  .catch(error => console.error('Unable to connect to the database:', error.message));

module.exports = sequelize;