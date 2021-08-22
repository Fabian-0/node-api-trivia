const sequelize = require("../../../config/database");
const Sequelize = require("sequelize");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const User = sequelize.define('User', {
  id: {
    type: Sequelize.DataTypes.UUID,
    primaryKey: true,
    defaultValue: Sequelize.literal("uuid_generate_v4()"),
    validate: {
      isNull: true
    }
  },
  username: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [5, 50]
    }
  },
  email: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
      len: [10, 100]
    }
  },
  score: {
    type: Sequelize.DataTypes.INTEGER,
    defaultValue: 0,
    validate: {
      isNumeric: true,
    }
  },
  password: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [8, 15]
    }
  }
},{
  tableName: "users",
  underscored: true,
  hooks: {
    beforeCreate: async (user, options) => {
      try {
        const hashed_password = await bcrypt.hashSync(user.password, saltRounds);
        user.password = hashed_password;
        return;
      } catch (error) {
        console.error("<<<<<<<<<<< Error Hash Password >>>>>>>>>>>",error.message);
      }
    },
    beforeBulkUpdate: async (user) => {
      try {
        if(user.attributes.password) {
          const hashed_password = await bcrypt.hashSync(user.attributes.password, saltRounds);
          user.attributes.password = hashed_password;
          return;
        }     
      } catch (error) {
        console.error("<<<<<<<<<<< Error Hash Password >>>>>>>>>>>",error.message);
      }
      return;
    }
  }
});

module.exports = User;