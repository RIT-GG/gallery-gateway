export function up (queryInterface, Sequelize) {
  return queryInterface.getForeignKeyReferencesForTable('user_shows')
    .then(fks => {
      if (Array.isArray(fks) && fks.length > 0) {
        const usernameConstraint = fks.find(fk => fk.columnName === 'username')
        const showIdConstraint = fks.find(fk => fk.columnName === 'showId')
        return Promise.all([
          queryInterface.removeConstraint('user_shows', usernameConstraint.constraintName),
          queryInterface.removeConstraint('user_shows', showIdConstraint.constraintName)
        ])
      }
    })
    .then(() => {
      return Promise.all([
        queryInterface.addConstraint('user_shows', {
          type: 'FOREIGN KEY',
          references: {
            table: 'users',
            field: 'username'
          },
          fields: ['username'],
          onDelete: 'cascade',
          onUpdate: 'cascade'
        }),
        queryInterface.addConstraint('user_shows', {
          type: 'FOREIGN KEY',
          references: {
            table: 'shows',
            field: 'id'
          },
          fields: ['showId'],
          onDelete: 'cascade',
          onUpdate: 'cascade'
        })
      ])
    })
}

export function down (queryInterface, Sequelize) {
  return queryInterface.getForeignKeyReferencesForTable('user_shows')
    .then(fks => {
      const usernameConstraint = fks.find(fk => fk.columnName === 'username')
      const showIdConstraint = fks.find(fk => fk.columnName === 'showId')

      return Promise.all([
        queryInterface.removeConstraint('user_shows', usernameConstraint.constraintName),
        queryInterface.removeConstraint('user_shows', showIdConstraint.constraintName)
      ])
    })
    .then(() => {
      return Promise.all([
        queryInterface.addConstraint('user_shows', {
          type: 'FOREIGN KEY',
          references: {
            table: 'users',
            field: 'username'
          },
          fields: ['username']
        }),
        queryInterface.addConstraint('user_shows', {
          type: 'FOREIGN KEY',
          references: {
            table: 'shows',
            field: 'id'
          },
          fields: ['showId']
        })
      ])
    })
}
