const PostModel = require('../models/posts.js');
const LikesModel = require('../models/likes.js')
const CommentsModel = require('../models/comments.js');  
const ShareModel = require('../models/shares.js');

// Create a post 
exports.create = async(req, res) => {
    try {
        const share_data_object = new ShareModel({
        post_id: req.params.id,
        shared_users_id: req.body.shared_users_id,
        count: req.body.shared_users_id.length
    });
 
        // Save 
        await share_data_object.save()
        
        res.status(201).send({ share_data_object })
    } catch (error) {
        res.status(400).send(error)
    }
};


// Create a post 
exports.update = async(req, res) => {
    var query = { post_id: req.params.id };
    await ShareModel.updateOne(
        // find record with name "MyServer"
        { post_id: req.params.id },
        // Concat new values into exising array
        { $concatArrays: { shared_users_id: req.body.shared_users_id } },
        { $set:  {count: shared_users_id.length}}
    );
};