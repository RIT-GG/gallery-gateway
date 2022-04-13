import DataTypes from 'sequelize'
import sequelize from '../config/sequelize'
import ScholarshipSubmission from './scholarshipSubmissions'

// Defines a scholarship object and all of its fields
const Scholarship = sequelize.define('scholarship', {
  // Name of scholarship
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    notEmpty: true
  },
  // Description for scholarship
  description: {
    type: DataTypes.STRING,
    allowNull: true,
    notEmpty: false
  },
  // State of the scholarship (true if active, false if inactive)
  active: {
    type:DataTypes.BOOLEAN,
    allowNull: false
  }
})

Scholarship.prototype.getSubmissions = function getSubmissions () {
  return ScholarshipSubmission.findAll({ where: { scholarshipId: this.id } })
}

Scholarship.prototype.getSubmissionsByPeriodId = function getSubmissionsByPeriodId (portfolioPeriodId) {
  if (typeof portfolioPeriodId === "number"){
    return ScholarshipSubmission.findAll({ where: { scholarshipId: this.id, portfolioPeriodId } })
  }
  return []
}

export default Scholarship