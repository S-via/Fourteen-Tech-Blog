// model exports
const {Model, Dataypes} = require('sequelize');
const sequelize = require('');
const bcrypt = require('bcrypt');

class User extends Model {
    checkPassword(loginPw){
        return bcrypt.compareSync(loginPw, this.pasword);
    }
}

User.init({
    user:
    {
        type: DataTypes.
    }
})