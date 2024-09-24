'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Add the 'location' column to the 'Events' table
    await queryInterface.addColumn('Events', 'location', {
      type: Sequelize.GEOMETRY('POINT', 4326),
      allowNull: true, // Set to true initially to avoid issues with existing rows
    });

    // Optionally populate the 'location' column using existing latitude and longitude values
    await queryInterface.sequelize.query(`
      UPDATE "Events" 
      SET location = ST_SetSRID(ST_MakePoint(longitude, latitude), 4326);
    `);

    // After populating, you can set allowNull to false if needed
    await queryInterface.changeColumn('Events', 'location', {
      type: Sequelize.GEOMETRY('POINT', 4326),
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Remove the 'location' column if you roll back the migration
    await queryInterface.removeColumn('Events', 'location');
  }
};
