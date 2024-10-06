// comment model

const { Model, Datatype } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model { }

Comment.init({
    id: {
        type: Datatype.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    comments: {
        type: Datatype.TEXT,
        allowNull: false
    },
    blog_id: {
        type: Datatype.INTEGER,
        allowNull: false,
        references: {
            model: 'blog',
            key: 'id'
        }
    },
    user_id: {
        type: Datatype.INTEGER,
        allowNull: false,
        references: {
            model: 'user',
            key:'id'
},
    },
    sequelize,
    timestamps:false,
    freezeTableName:true,
    modelName:'comment'
});
module.exports = Comment;