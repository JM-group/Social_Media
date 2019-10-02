const mongoose = require('mongoose');

const follow_details_schema = mongoose.Schema({
    user_id: String,
    followers_id: Array,
    following_id: Array
}, {
    timestamps: true
});


module.exports = mongoose.model('follow', follow_details_schema);