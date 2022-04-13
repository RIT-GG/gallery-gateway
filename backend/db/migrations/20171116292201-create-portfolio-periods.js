/**
 * Creates the 'portfolioPeriods' table
 * @param {*} queryInterface 
 * @param {*} Sequelize 
 * @returns 'portfolioPeriods' table
 */
 export function up (queryInterface, Sequelize) {
    return queryInterface.createTable('portfolioPeriods', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },

      // Name of the portfolio period
      name: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      // Description for the portfolio period
      description: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      // Start and end dates for the period's submission period
      startDate: {
        type: Sequelize.DATE,
        allowNull: false,
        notEmpty: true
      },
      endDate: {
        type: Sequelize.DATE,
        allowNull: false,
        notEmpty: true
      },

      // Start and end dates for the period's judging period
      judgingStartDate: {
        type: Sequelize.DATE,
        allowNull: false,
        notEmpty: true
      },
      judgingEndDate: {
        type: Sequelize.DATE,
        allowNull: false,
        notEmpty: true
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
    return queryInterface.dropTable('portfolioPeriods')
  }