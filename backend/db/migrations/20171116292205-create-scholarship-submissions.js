/**
 * Creates the 'scholarshipSubmissions' table
 * @param {*} queryInterface 
 * @param {*} Sequelize 
 * @returns 'scholarshipSubmissions' table
 */
 export function up (queryInterface, Sequelize) {
    return queryInterface.createTable('scholarshipSubmissions', {
      // the id of scholarship submission
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      // link to the path of the essay (.pdf) associated with this scholarship
      essayPath: {
        allowNull: false,
        type: Sequelize.STRING
      },
      // id of scholarship the submission is for
      scholarshipId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'scholarships',
          key: 'id'
        }
      },
      // id of associated portfolio period
      portfolioPeriodId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'portfolioPeriods',
          key: 'id'
        }
      },
      // id of portfolio submitted
      portfolioId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'portfolios',
          key: 'id'
        }
      },
      // When the scholarship was initially created
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      },
      // The last time the scholarship was updated
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      }
    })
  }
    
  export function down (queryInterface) {
    return queryInterface.dropTable('scholarshipSubmissions')
  }
    