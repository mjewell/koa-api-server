import Promise from 'bluebird';
import moment from 'moment';
import _ from 'lodash';
import encryptFieldValue from '../services/models/encryptFieldValue';
import applyHash from '../services/applyHash';
import bcryptNode from 'bcrypt-nodejs';
import {
  isEmail as isEmailMsg,
  len as lenMsg,
  notEmpty as notEmptyMsg
} from './validation/messages';
const bcrypt = Promise.promisifyAll(bcryptNode);

function encryptPassword(user) {
  return encryptFieldValue(user, 'password');
}

export default (sequelize, DataTypes) => {
  const User = sequelize.define('User',
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
      },
      email: {
        type: DataTypes.STRING(254), // eslint-disable-line new-cap
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: {
            msg: notEmptyMsg
          },
          isEmail: {
            msg: isEmailMsg
          }
        }
      },
      password: {
        type: DataTypes.VIRTUAL,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: notEmptyMsg
          },
          len: {
            args: [8],
            msg: lenMsg(8)
          }
        },
        set(val) {
          this.setDataValue('password', val);
          this.setDataValue('passwordHash', val);
        }
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
    }, {
      timestamps: true,

      classMethods: {
        associate(models) {
          User.hasMany(models.AccessToken, {
            foreignKey: 'userId'
          });
        }
      },

      instanceMethods: {
        verifyPassword(candidatePassword) {
          if (!candidatePassword || !this.passwordHash) { return false; }

          return bcrypt.compareAsync(candidatePassword, this.passwordHash);
        },

        verifyAccessToken(candidateToken) {
          if (!candidateToken) { return false; }

          return applyHash(candidateToken)
            .then(hashedToken => {
              return this.getAccessTokens({ where: {
                value: hashedToken,
                expires: { $gte: moment().format() }
              } });
            })
            .then(tokens => tokens.length > 0);
        },

        toJSON() {
          return _.pick(this, [
            'email',
            'firstName',
            'lastName',
            'dob',
            'gender',
            'phoneNumber'
          ]);
        }
      }
    }
  );

  User.beforeCreate(encryptPassword);
  User.beforeUpdate(encryptPassword);

  return User;
};
