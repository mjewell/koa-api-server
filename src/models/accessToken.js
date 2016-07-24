import hashFieldValue from '../services/models/hashFieldValue';

function hashToken(accessToken) {
  return hashFieldValue(accessToken, 'value');
}

export default (sequelize, DataTypes) => {
  const AccessToken = sequelize.define('AccessToken',
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
    }, {
      timestamps: false,

      classMethods: {
        associate(models) {
          AccessToken.belongsTo(models.User, {
            foreignKey: 'userId'
          });
        }
      }
    }
  );

  AccessToken.beforeCreate(hashToken);
  AccessToken.beforeUpdate(hashToken);

  return AccessToken;
};
