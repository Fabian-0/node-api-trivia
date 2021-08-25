const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    },
  }
});

sequelize.authenticate()
  .then(res => console.log('Connection has been established successfully.'))
  .catch(error => console.error('Unable to connect to the database:', error.message));

module.exports = sequelize;