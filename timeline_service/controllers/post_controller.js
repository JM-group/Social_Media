const PostModel = require('../models/posts.js');
const LikesModel = require('../models/likes.js')
const CommentsModel = require('../models/comments.js');
const ShareModel = require('../models/shares.js');

// Create a post 
exports.create = async(req, res) => {
    console.log('insiididideineininineeiweijwiejwijewjewjeiw');
    console.log(req.body);
    try {
            const post_data_object = new PostModel({
                user_id: req.body.user_id,
                community_id: req.body.community_id,
                description:req.body.description,
                location:req.body.location,
                post_media: [{media_url: "url", tags: [{user_name: "dmfskfsdkmfs", user_id: "12", place_name: "Nagai"}] }],
            });
 
             // Save 
            await post_data_object.save()
             
            res.status(201).send({ post_data_object })
    } catch (error) {
            res.status(400).send(error)
    }
}; 