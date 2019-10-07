const mongoose = require('mongoose');

const post_schema = mongoose.Schema({
    user_id: String,
    description: String,
    post_media: Array,
    community_id: String,
    location: Array,
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



/*

// Json format to create post

{
	"user_id": "12",
	"community_id": "16",
	"description": "lorem Epsom",
	"location": [],
	"post_media": [{
		"id": "",
		"media_url": "",
		"tags": [{
			"co_ords": [],
			"user_name": "",
			"place_name": ""
		}, {
			"co_ords": [],
			"user_name": "",
			"place_name": ""
		}]
	}]
}


*/