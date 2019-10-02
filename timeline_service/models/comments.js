const mongoose = require('mongoose');

const comments_schema = mongoose.Schema({
    post_id: String,
    media_id: String,
    parent_comment_id: Array,
    user_id: String,
    text: String,
    media: Array,
    tags: Array
}, {
    timestamps: true
});

post_schema.virtual('likes', {
    ref: 'likes', 
    localField: '_id',
    foreignField: 'post_id', 
    justOne: false
});

//Need to study more about shares use cases.
/*
post_schema.virtual('shares', {
    ref: 'shares', 
    localField: '_id',
    foreignField: 'post_id', 
    justOne: false
});  */

module.exports = mongoose.model('comments', comments_schema);
