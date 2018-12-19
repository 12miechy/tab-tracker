const Promise = require('bluebird')
// bcrypt-nodejs内のすべてのメソッドにPromise版を追加する
const bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'))

function hashPassword (user, options) {
  const SALT_FACTOR = 8
  console.log('hashPassword')

  if (!user.changed('password')) {
    console.log('return')
    return
  }
  console.log('bcrypt')
  return bcrypt
    .genSaltAsync(SALT_FACTOR)
    .then(salt => bcrypt.hashAsync(user.password, salt, null))
    .then(hash => {
      user.setDataValue('password', hash)
    })
}

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    password: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: hashPassword,
      beforeUpdate: hashPassword,
      beforeSave: hashPassword
    }
  })

  User.prototype.comparePassword = function (password) {
    console.log('comparePassword')
    console.log(password, this.password)
    console.log('compareAsync')
    console.log(bcrypt.compareAsync(password, this.password))
    console.log('compareSync')
    console.log(bcrypt.compareSync(password, this.password))
    return bcrypt.compareAsync(password, this.password)
  }

  User.associate = function (models) {
  }

  console.log('User')
  return User
}
