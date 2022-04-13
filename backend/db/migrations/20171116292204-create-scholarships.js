/**
 * Creates the 'scholarships' table
 * @param {*} queryInterface 
 * @param {*} Sequelize 
 * @returns 'scholarships' table
 */
 export function up (queryInterface, Sequelize) {
    return queryInterface.createTable('scholarships', {
      // the id of scholarship
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      // Name of scholarship
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        notEmpty: true
      },
      // Description for scholarship
      description: {
        type: Sequelize.STRING,
        allowNull: true,
        notEmpty: false
      },
      // State of the scholarship (true if active, false if inactive)
      active: {
        type:Sequelize.BOOLEAN,
        allowNull: false
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
    return queryInterface.dropTable('scholarships')
  }
    