const sequelize = require('../config/connection');
const { Blog,User } = require('../models');

const userData = require('./userData.json');
const blogData = require('./blogData.json');

const seedDatabase = async () => {
    await sequelize.sync({force:true});
    const users = await User.bulkCreate(userData,{

    });


}