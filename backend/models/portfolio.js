import DataTypes from 'sequelize'
import sequelize from '../config/sequelize'
import Entry from './entry'

// Defines a portfolio object and all of its fields
const Portfolio = sequelize.define('portfolio', {
  // Title of the portfolio
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    notEmpty: true
  },
  // The username of the student who owns the portfolio
  studentUsername: {
    allowNull: true,
    type: DataTypes.STRING,
    references: {
      model: 'users',
      key: 'username'
    },
    onDelete: 'cascade',
    onUpdate: 'cascade'
  },
  name: {
    type:DataTypes.STRING,
    allowNull: true
  }
})

Portfolio.prototype.getEntries = function getEntries () {
  return Entry.findAll({ where: { portfolioId: this.id } })
}

export default Portfolio
