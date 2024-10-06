// blog post model 

const { Model, Datatypes } = require('sequelize');
const sequelize = require('../config/connection');

class Blog extends Model { }

Blog.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: Datatypes.STRING,
        allowNull: false
    },
    content: {
        type: Datatypes.TEXT,
        allowNull: false,
    },
    user_id: {
        type: Datatypes.INTEGER,
        allowNull: false,
        references: {
            model: 'user',
            key: 'id'
        },
    },
    
    sequelize,
    timestamps:false,
    freezeTableName:true,
    modelName:'blog'

});
module.exports = Blog;
