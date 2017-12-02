'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('Profiles', {
          id_profile: {
              type: Sequelize.INTEGER,
              primaryKey: true,
              autoIncrement: true
          },
          name: {
            type: Sequelize.STRING
          },
          surname: {
            type: Sequelize.STRING
          },
          date_of_birth: {
            type: Sequelize.DATE
          },
          male: {
            type: Sequelize.STRING(10)
          },
          work_location: {
            type: Sequelize.STRING
          },
          pc_from_deal: {
              type: Sequelize.FLOAT(10)
          },
          username: {
              type: Sequelize.INTEGER,
              primaryKey: true,
              allowNull: false,
              onDelete: 'CASCADE',
              onUpdate: 'CASCADE',
              references: {
                  model: "Users" ,
                  key: 'username'
              }
          }
      });
  },
  down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('Profiles');
  }
};
