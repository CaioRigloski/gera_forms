const db = require("../config/db");

const Login = db.sequelize.define('logins', {
  login: {
    type: db.Sequelize.STRING
  },
  password: {
    type: db.Sequelize.STRING
  }
})

//Login.sync()

module.exports = Login