import DataTypes from 'sequelize'
import sequelize from '../config/sequelize'

const PortfolioPeriodJudge = sequelize.define('portfolioPeriodJudge', {
    // id of the Portfolio Period
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

    // The username of the judge for the Portfolio Period
    judgeUsername: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'users',
          key: 'username'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
    },
})

export default PortfolioPeriodJudge