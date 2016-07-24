module.exports = {
  up(queryInterface, DataTypes) {
    return queryInterface.createTable(
      'Users',
      {
        id: {
          type: DataTypes.BIGINT,
          primaryKey: true,
          autoIncrement: true
        },
        email: {
          type: DataTypes.STRING(254), // eslint-disable-line new-cap
          allowNull: false,
          unique: true
        },
        passwordHash: {
          type: DataTypes.TEXT
        },
        firstName: {
          type: DataTypes.TEXT
        },
        lastName: {
          type: DataTypes.TEXT
        },
        dob: {
          type: DataTypes.DATEONLY
        },
        gender: {
          type: DataTypes.ENUM('M', 'F', 'O') // eslint-disable-line new-cap
        },
        phoneNumber: {
          type: DataTypes.TEXT
        },
        createdAt: {
          type: DataTypes.DATE
        },
        updatedAt: {
          type: DataTypes.DATE
        }
      }
    ).then(() =>
      queryInterface.addIndex(
        'Users',
        [DataTypes.col('email')],
        {
          indexName: 'users_email',
          indicesType: 'unique'
        }
      )
    );
  },

  down(queryInterface) {
    return queryInterface.dropTable('Users');
  }
};
