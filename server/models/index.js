const {Sequelize} = require('sequelize')
const {sequelize} = require('../db')

// Define Sauce model
const Sauce = sequelize.define("sauces", {
  name: Sequelize.STRING,
  image: Sequelize.STRING,
});

// Alex - Define Item model
const Item = sequelize.define("items", {
  name: Sequelize.STRING,
  description: Sequelize.STRING,
  price: Sequelize.INTEGER,
  image: Sequelize.STRING,
});

// MichaelH - Define User Model
const User = sequelize.define("users", {
  username: Sequelize.STRING,
  email: Sequelize.STRING,
  password: Sequelize.STRING,
});

// MichaelH - Define Order Model
const Order = sequelize.define("orders", {
  userId: Sequelize.INTEGER,
  products: Sequelize.STRING
})

// MichaelH - Define relationship
User.hasMany(Order, {as:'Orders', foreignKey:'userId'});
Order.belongsTo(User, {as:'User', foreignKey:'userId'});

module.exports = {
  db: sequelize,
  Sauce,
  Item,
  Order,
  User,
};
