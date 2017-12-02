'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('Users', {
          username: {
            primaryKey: true,
            allowNull: false,
            type: Sequelize.STRING
          },
          hashPassword: {
            type:Sequelize.STRING
          },
          right_level: {
            defaultValue: 1,
            type: Sequelize.INTEGER
          }
      })
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('Users');
  }
};
