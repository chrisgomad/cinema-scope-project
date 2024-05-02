const {sauces, items, orders, users} = require('./seedData.js');

const {sequelize} = require('./db');
const {Sauce} = require('./models');
const {Item} = require('./models');
const {Order} = require('./models');
const {User} = require('./models');

const seed = async () => {

    try {
        // drop and recreate tables per model definitions
        await sequelize.sync({ force: true });
    
        // insert data
        await Promise.all(sauces.map(sauce => Sauce.create(sauce)));
        // Alex - Added the below line to seed the items table
        await Promise.all(items.map(item => Item.create(item)));
        //MichaelH - seed the User table
        await Promise.all(users.map(user => User.create(user)));
        // MichaelH - seed the Order table
        await Promise.all(orders.map(order => Order.create(order)));


        console.log("db populated!");
    } catch (error) {
        console.error(error);
    }
}

seed();
