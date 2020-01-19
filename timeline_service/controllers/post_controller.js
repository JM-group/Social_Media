const PostModel = require('../models/posts.js');
const LikesModel = require('../models/likes.js')
const CommentsModel = require('../models/comments.js');
const ShareModel = require('../models/shares.js');
const VideoUploadHelpers = require('../helpers/upload_videos.js')

// Create a post 
exports.uploadVideo = async(req, res) => {
    console.log('insiididideineininineeiweijwiejwijewjewjeiw');
    console.log(req.body);
    console.log(req.file);
    console.log(req);
    //console.log(req.body.file)
    console.log("66777766666667777");
    //console.log(req.body.file._parts);
    var uploaded_video_path = await VideoUploadHelpers(req, res);
    console.log("uploaded video path value issssss === ", uploaded_video_path); 
    console.log("value coming here issss == ((()))");
    console.log(uploaded_video_path);
    //console.log(req);
    //res.status(201).send({msg: "success here", videoPath: uploaded_video_path}); 
    res.status(201).send(uploaded_video_path)
}; 

exports.create = async(req, res) => {
    console.log("inside insideinside insideinside insideinside insideinside inside");
    console.log(req);
    console.log("iiiiiidsaidasiiiiiiiiiiiiiiii");
    //console.log(req.user);
    try {
            const post_data_object = new PostModel({
                user_id: req.user._id,
                community_id: req.body.community_id,
                description:req.body.description,
                location:req.body.location,
                post_media: [req.body.path],
                post_type: req.body.post_type
                //post_media: [{media_url: "url", tags: [{user_name: "dmfskfsdkmfs", user_id: "12", place_name: "Nagai"}] }],
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
    }})
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

exports.update_post_type = (req, res) => {
    console.log("inside update post type value hereeee going onn");
    console.log(req.body);
    console.log("=========");
    console.log(req.params);
    PostModel.findByIdAndUpdate(req.params.post_id, {$set:{
        post_type: req.body.post_type
    }})
    .then(data => {
        if(!data) {
            return res.status(404).send({
                status: false, message: "Record not found with id " + req.params.id
            });
        }
        data['status'] = true;
        res.send(data);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                status: false, message: "Record not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            status: false, message: "Error updating record with id " + req.params.festiveId
        });
    });
}

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
    var query = { post_id: req.params.post_id };
    var err_status = false;
    try {
        const post_data_object = await PostModel.findByIdAndDelete(req.params.post_id);
        const comments_data_object = await CommentsModel.deleteMany(query, function (err, r) {
            if (err) {
                err_status = true
                res.status(401).send(err);
            }
        }); 
        const likes_data_object = LikesModel.deleteMany(query, function (err, r) {
            if (err) {
                err_status = true
                res.status(401).send(err);
            }
        });
        if (err_status == false) {
            res.status(201).send({ "status": "Successfuly deleted post" })        
        } else {
            res.status(400).send({ "status": "Error happened in deleting post" })                    
        }    
    } catch (error) {
        res.status(400).send(error)
    }
};   