const sequelize = require('../config/connection');
const { Blog, User, Comment } = require('../models');

const userData = require('./userData.json');
const blogData = require('./blogData.json');
const commentData = require('./commentData.json');

const seedDatabase = async () => {
    try {
        await sequelize.sync({ force: true });

        const users = await User.bulkCreate(userData, {
            individualHooks: true,
            returning: true,
        });

        const blogs = await Blog.bulkCreate(blogData, {
            returning: true,
        });

        await Comment.bulkCreate(
            commentData.map(comment => ({
                ...comment,
                user_id: users[Math.floor(Math.random() * users.length)].id,
                blog_id: blogs[Math.floor(Math.random() * blogs.length)].id,
            })),
            {
                returning: true,
            });

        process.exit(0);
    } catch (error) {
        console.error('failed', error);
    }
}
seedDatabase();

module.exports = seedDatabase;