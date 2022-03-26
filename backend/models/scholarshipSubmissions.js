import DataTypes from 'sequelize'
import sequelize from '../config/sequelize'
import Portfolio from './portfolio'

// Defines a scholarship submission object and all of its fields
const ScholarshipSubmission = sequelize.define('scholarshipSubmissions', {
  // id of scholarship the submission is for
  scholarshipId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: 'scholarships',
      key: 'id'
    },
    onDelete: 'cascade',
    onUpdate: 'cascade'
  },

  // id of associated portfolio period
  portfolioPeriodId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: 'portfolioPeriods',
      key: 'id'
    },
    onDelete: 'cascade',
    onUpdate: 'cascade'
  },

  // id of portfolio submitted
  portfolioId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: 'portfolios',
      key: 'id'
    },
    onDelete: 'cascade',
    onUpdate: 'cascade'
  },
})

ScholarshipSubmission.prototype.getPortfolio = function getPortfolio(){
  return Portfolio.findByPk(this.portfolioId)
}

export default ScholarshipSubmission