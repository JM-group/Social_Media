const mongoose = require('mongoose');

const likes_schema = mongoose.Schema({
    post_id: String,
    media_id: String,
    parent_comment_id: String,
    comment_id: String,
    liked_by: Array,
    likes_count: Number
}, {
    timestamps: true
});

module.exports = mongoose.model('likes', likes_schema);
