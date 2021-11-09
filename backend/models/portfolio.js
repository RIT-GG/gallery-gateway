import DataTypes from 'sequelize'
import sequelize from '../config/sequelize'

var maxEntriesLength = 10;

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
  }
});

export default Portfolio