const mongoose = require('mongoose');

const user_schema = mongoose.Schema({
    email: String,
    ph_number: Number,
    auth_token: String,
    refresh_token: String,
    first_name: String,
    last_name: String,
    gender: String,
    age: Number,
    profile_pic: String
}, {
    timestamps: true
});

user_schema.virtual('follow', {
    ref: 'follow', 
    localField: '_id',
    foreignField: 'user_id', 
    justOne: false
});

module.exports = mongoose.model('user', user_schema);
