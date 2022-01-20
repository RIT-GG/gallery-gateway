import DataTypes from 'sequelize'
import sequelize from '../config/sequelize'
import PortfolioPeriodJudge from './portfolioPeriodJudge'

const PortfolioPeriod = sequelize.define('portfolioPeriod', {
    // Start and end dates for the period's submission period
    startDate: {
        type: DataTypes.DATE,
        allowNull: false,
        notEmpty: true
    },
    endDate: {
        type: DataTypes.DATE,
        allowNull: false,
        notEmpty: true
    },

    // Start and end dates for the period's judging period
    judgingStartDate: {
        type: DataTypes.DATE,
        allowNull: false,
        notEmpty: true
    },
    judgingEndDate: {
        type: DataTypes.DATE,
        allowNull: false,
        notEmpty: true
    }
})

PortfolioPeriod.prototype.getJudges = function getJudges () {
    return PortfolioPeriodJudge.findAll({ where: { portfolioPeriodId: this.id } })
}

export default PortfolioPeriod