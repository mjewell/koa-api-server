module.exports = {
  up(queryInterface, DataTypes) {
    return queryInterface.createTable(
      'AccessTokens',
      {
        id: {
          type: DataTypes.BIGINT,
          primaryKey: true,
          autoIncrement: true
        },
        value: {
          type: DataTypes.TEXT,
          allowNull: false
        },
        expires: {
          type: DataTypes.DATE,
          allowNull: false
        },
        userId: {
          type: DataTypes.BIGINT,
          references: {
            model: 'Users',
            key: 'id'
          }
        }
      }
    );
  },

  down(queryInterface) {
    return queryInterface.dropTable('RefreshTokens');
  }
};
