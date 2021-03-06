import User from './user'
import Entry from './entry'
import DataTypes from 'sequelize'
import sequelize from '../config/sequelize'
import { ALLOWED_VOTE_VALUES } from '../constants'

const Vote = sequelize.define('vote', {
  judgeUsername: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: 'users',
      key: 'username'
    },
    onDelete: 'cascade',
    onUpdate: 'cascade'
  },
  entryId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'entry',
      key: 'id'
    },
    onDelete: 'cascade',
    onUpdate: 'cascade'
  },
  value: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
},
{
  validate: {
    voteValueValidation () {
      if (!ALLOWED_VOTE_VALUES.has(this.value)) {
        throw new Error('Vote value must be 0, 1, or 2')
      }
    }
  }
})

/**
 * Gets the judge for the vote as a Promise
 */
Vote.prototype.getJudge = function getJudge () {
  if (!this.judgeUsername) {
    return Promise.resolve(null)
  }
  return User.findByPk(this.judgeUsername)
}

/**
 * Gets the entry for the vote as a Promise
 */
Vote.prototype.getEntry = function getEntry () {
  if (!this.entryId) {
    return Promise.resolve(null)
  }
  return Entry.findByPk(this.entryId)
}

export default Vote
