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
  // Leave it for reasons unbeknownst to anyone anymore
  name: {
    type:DataTypes.STRING,
    allowNull: true
  },
  // The portfolioPeriodId the portfolio is associated with
  portfolioPeriodId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'portfolioPeriods',
      key: 'id'
    },
    onDelete: 'no action',
    onUpdate: 'cascade'
  }
})

Portfolio.prototype.getEntries = function getEntries () {
  return Entry.findAll({ where: { portfolioId: this.id } })
}

export default Portfolio