/**
 * Creates the 'portfolioPeriodJudges' table
 * @param {*} queryInterface 
 * @param {*} Sequelize 
 * @returns 'portfolioPeriodJudges' table
 */
 export function up (queryInterface, Sequelize) {
    return queryInterface.createTable('portfolioPeriodJudges', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      
      // id of the Portfolio Period
      portfolioPeriodId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'portfolioPeriods',
          key: 'id'
        },
      },

      // The username of the judge for the Portfolio Period
      judgeUsername: {
        type: Sequelize.STRING,
        allowNull: false,
        references: { model: 'users', key: 'username' },
        primaryKey: true
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      }
    })
  }
    
  export function down (queryInterface) {
    return queryInterface.dropTable('portfolioPeriodJudges')
  }