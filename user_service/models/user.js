const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const envFile = require('../env.js');

mongoose.set('useCreateIndex', true);

const user_schema = mongoose.Schema({
    email: { type: String, required: true, unique: true, dropDups: true, lowercase: true},
    ph_number: Number,
    auth_token: String,
    refresh_token: String,
    first_name: String,
    last_name: String,
    display_name: String,
    gender: String,
    age: Number,
    profile_pic: String,
    status: Boolean, 
    tokens: [{
        token: {
            type: String,
            required: true
        } 
    }]
}, {
    timestamps: true
});

user_schema.methods.generateAuthToken = async function() {
    // Generate an auth token for the user
    console.log('entering generate auth method inside here');
    const user = this;
    console.log(user._id);
    const token = jwt.sign({_id: user._id}, envFile['secret'])
    console.log('token valueeeee is ==', token);
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}  

/* user_schema.pre('save', async function (next) {
    // Hash the password before saving the user model
    const user = this, JWT_KEY = 'lorem'
    const token = jwt.sign({_id: user}, JWT_KEY)
    user.tokens = user.tokens.concat({token})
    next()
}) */

//    return token
user_schema.statics.findByCredentials = async (email, token) => {
    // Search for a user by email and password.
    const users = await User.findOne({ email} )
    if (!users) {
      // throw new Error({ error: 'Invalid login credentials' })
    } 
    return users
}


user_schema.virtual('follow', {
    ref: 'follow', 
    localField: '_id',
    foreignField: 'user_id', 
    justOne: false
});

const User = mongoose.model('user', user_schema);
module.exports = User


/*
JSON to create user

{
    "email": "mas11@g2ail.com",
    "ph_number": 16478037288,
    "auth_token": "156a",
    "refresh_token": "5679",
    "first_name": "Mohamed",
    "last_name": "12355Ashif",
    "gender": "Male",
    "age": 22
}

*/