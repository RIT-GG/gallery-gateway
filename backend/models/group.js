import DataTypes from 'sequelize'
import sequelize from '../config/sequelize'

import User from './user'

const Group = sequelize.define('group', {
  creatorUsername: {
    allowNull: false,
    type: DataTypes.STRING,
    references: {
      model: 'users',
      key: 'username'
    },
    onDelete: 'cascade',
    onUpdate: 'cascade'
  },
  participants: {
    allowNull: false,
    type: DataTypes.STRING
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE
  },
  updatedAt: {
    allowNull: false,
    type: DataTypes.DATE
  }
})

/**
 * Gets the creator of this group as a Promise
 */
Group.prototype.getCreator = function getCreator () {
  if (!this.creatorUsername) {
    return Promise.resolve(null)
  }
  return User.findByPk(this.creatorUsername)
}

export default Group
