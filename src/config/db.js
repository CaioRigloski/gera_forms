const Sequelize = require('sequelize')

sequelize = new Sequelize('geraforms', 'root', 'senha123', {
  host: 'localhost',
  dialect: 'mysql'
})

module.exports = {
  Sequelize: Sequelize,
  sequelize: sequelize
}