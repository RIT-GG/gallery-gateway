export function up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('scholarships', [
      {
        id: 1,
        name: 'Spring 2022 Scholarship',
        description: 'Scholarship for the spring 2022 semester.',
        active: true
      },
      {
        id: 2,
        name: 'Spring 2021 Scholarship',
        description: 'Scholarship for the spring 2021 semester.',
        active: false
      },
    ])
}

export function down (queryInterface) {
  return queryInterface.bulkDelete('scholarshipSubmissions', null)
  .then(() => {
    return queryInterface.bulkDelete('scholarships', null)
  })
}