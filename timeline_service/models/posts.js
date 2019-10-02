const mongoose = require('mongoose');

const post_schema = mongoose.Schema({
    user_id: String,
    description: String,
    post_media: Array,
    community_id: String
}, {
    timestamps: true
});

post_schema.virtual('likes', {
    ref: 'likes', 
    localField: '_id',
    foreignField: 'post_id', 
    justOne: false
});

post_schema.virtual('comments', {
    ref: 'comments', 
    localField: '_id',
    foreignField: 'post_id', 
    justOne: false
});

post_schema.virtual('shares', {
    ref: 'shares', 
    localField: '_id',
    foreignField: 'post_id', 
    justOne: false
});

module.exports = mongoose.model('post', post_schema);
