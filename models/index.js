// relationship between models

// export each invidual model
const User = require('./user');
const Blog =require('./blog');
const Comment = require('./comment');

// user has many blog
User.hasMany(Blog,{
    foreignKey:'user_id',
    onDelete:'CASCADE'

});

// user has many comments
User.hasMany(Comment,{
    foreignKey:'user_id',
    onDelete:'CASCADE'
});

// blog belongs to user
Blog.belongsTo(User,{
    foreignKey:'user_id'
});

//blog has many comment
Blog.hasMany(Comment,{
    foreignKey:'blog_id',
    onDelete:'CASCADE'
})

// comment belong to user
Comment.belongsTo(User,{
    foreignKey:'user_id'
})


// comments belong to a blog
Comment.belongsTo(Blog,{
    foreignKey:'blog_id'
})

module.exports ={User,Blog,Comment};