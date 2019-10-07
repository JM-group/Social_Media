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


// Update or edit information about user
exports.update = (req, res) => {
    console.log('insiide update valuuuuueeeeeeeeeeee');
    console.log(req.params);
    console.log(req.query);
    console.log(req.body);
    PostModel.findByIdAndUpdate(req.query.id, {$set:{
        user_id: req.body.user_id,
        community_id: req.body.community_id,
        description:req.body.description,
        location:req.body.location,
        post_media: [{media_url: "url", tags: [{user_name: "dmfskfsdkmfs", user_id: "12", place_name: "Nagai"}] }],
    }}, {new: true})
    .then(data => {
        if(!data) {
            return res.status(404).send({
                message: "Record not found with id " + req.params.id
            });
        }
        res.send(data);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Record not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error updating record with id " + req.params.festiveId
        });
    });
};


//Get Post Object
exports.get = async(req, res) => {
    console.log('inside geeetttttttttt valueeeeeeee');
    console.log(req.query);
    console.log(req.params);
    try {
        const post_data_object = await PostModel.findById(req.params.id);
        res.status(201).send({ post_data_object })        
    } catch (error) {
        res.status(400).send(error)
    }
};    


//Delete Post Object
exports.delete = async(req, res) => {
    console.log('inside geeetttttttttt valueeeeeeee');
    console.log(req.query);
    console.log(req.params);
    try {
        const post_data_object = await PostModel.findByIdAndDelete(req.params.id);
        res.status(201).send({ "status": "Successfuly deleted post" })        
    } catch (error) {
        res.status(400).send(error)
    }
};   