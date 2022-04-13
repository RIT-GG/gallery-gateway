import DataTypes from 'sequelize'
import sequelize from '../config/sequelize'
import PortfolioPeriodJudge from './portfolioPeriodJudge'
import Portfolio from './portfolio'
import User from './user'

const PortfolioPeriod = sequelize.define('portfolioPeriod', {
    name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true
    },
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

PortfolioPeriod.prototype.getPortfolios = function getPortfolios() {
    return Portfolio.findAll({ where: { portfolioPeriodId: this.id } })
}

PortfolioPeriod.prototype.getJudges = async function getJudges() {
    // Find all portfolio period judge models with this portfolio period id 
    const portfolio_period_judges = await PortfolioPeriodJudge.findAll({ where: { portfolioPeriodId: this.id } })
    // Grab the judge user object from the database
    const judges = await portfolio_period_judges.map(async (judge) => await User.findOne({ where: { username: judge.judgeUsername } }))
    return judges

}

export default PortfolioPeriod