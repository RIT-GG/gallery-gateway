import DataTypes from 'sequelize'
import sequelize from '../config/sequelize'

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

export default ScholarshipSubmission