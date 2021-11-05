import DataTypes from 'sequelize'
import sequelize from '../config/sequelize'

var maxEntriesLength = 10;

const Portfolio = sequelize.define('portfolio', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    notEmpty: true
  },
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
  numberOfEntries: {
    allowNull: false,
    type: DataTypes.INTEGER,
    max: 10,
    default: 1
  }
  // entries: {
  //   allowNull: true,
  //   type: DataTypes.ARRAY(DataTypes.INTEGER),
  //   validate: {
  //     isUnderMaxEntriesAllowed(value) {
  //       if (value.length > maxEntriesLength) {
  //         throw new Error(`entries must stay below the ${maxEntriesLength} submissions limit`)
  //       }
  //     }
  //   }
  // }
});

export default Portfolio