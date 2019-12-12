const PostModel = require('../models/posts.js');
const LikesModel = require('../models/likes.js')
const CommentsModel = require('../models/comments.js');  
const ShareModel = require('../models/shares.js');

// Create a post 
exports.createPostLikes = async(req, res) => {
    console.log("inside create post likes values here going on --");
    console.log(req.body);
    console.log(req.params);
    console.log("--------------");
    var row_exists = false, query = { _id: req.body.post_id }, likes_data_object, currentLikesCount;
    try {
        currentLikesCount = await LikesModel.find({post_id : req.body.post_id}, function (err, docs) {
            if (docs.length){
                row_exists = true
            } else{
                row_exists = false
            }
        });
        console.log('after document exist query find value here ==', row_exists);

        if (!row_exists && req.body.action) {
            console.log("inside 11111111")
            likes_data_object = new LikesModel({
                post_id: req.body.post_id,
                liked_by:[req.user._id],
                likes_count: 1,
            });
            console.log("before save value hereee");
            await likes_data_object.save();
            console.log("after save value hereeeee");
            await PostModel.findByIdAndUpdate(req.body.post_id, {$set:{
                likes_count: 1,
            }})    
        } else {
            console.log("inside 22222222222");
            console.log('req.body.post_id value here iss ==', req.body.post_id);
             
            console.log("//////////////////////////////////////////////////////////////////");
            console.log(currentLikesCount._id);
            console.log(currentLikesCount[0]);
            console.log(currentLikesCount[0]._id);
            console.log(currentLikesCount[0].likes_count);
            console.log("444444444444666666666666668888888888888899999999999990000000000222222333335555");
            if (req.body.action) {
                console.log("inside 333333333333");
                var values = { $set: {likes_count: currentLikesCount[0].likes_count || currentLikesCount[0].likes_count == 0 ? currentLikesCount[0].likes_count + 1 : 0 },
                    $push: {liked_by: req.user._id} };    
            } else {    
                console.log("inside 4444444444444");
                var values = { $set: {likes_count: currentLikesCount[0].likes_count && currentLikesCount[0].likes_count > 0 ? currentLikesCount[0].likes_count - 1 : 0 },
                    $pull: {liked_by: req.user._id} };
            }
            console.log("5555555555555555");
            console.log(values);
            //res.status(201).send({ "status": "Successfuly updated likes" })
                likes_data_object = await LikesModel.updateOne({ post_id: req.body.post_id }, values, function(err, response) {
                    if (err) throw res.status(401).send(err);
                    console.log("inside likes model value hereeeee");
                    console.log(LikesModel);
                }); 

            if (req.body.action) {
                console.log("666666666666");
                var likeCountVal = { $set: {likes_count: currentLikesCount[0].likes_count || currentLikesCount[0].likes_count == 0 ? currentLikesCount[0].likes_count + 1 : 0 }}
                await PostModel.updateOne(query, likeCountVal, function(err, response) {
                    if (err) throw res.status(401).send(err);
                    console.log("inside post model value here iss");
                    console.log(response);
                    console.log("after response value isss");
                });
            } else {
                console.log("77777777777777");
                var likeCountVal = { $set: {likes_count: currentLikesCount[0].likes_count && currentLikesCount[0].likes_count > 0 ? currentLikesCount[0].likes_count - 1 : 0 }}
                await PostModel.updateOne(query, likeCountVal, function(err, response) {
                    if (err) throw res.status(401).send(err);
                    console.log("inside post model value here iss");
                    console.log(response);
                    console.log("after response value 223334445566");
                });
            }    
        }   
        
        console.log("befoer sendin value outside here iss");    
        res.status(201).send({ likes_data_object })
    } catch (error) {
        res.status(400).send(error)
    }
}; 


// Update post likes 
exports.updatePostLikes = async(req, res) => {
    console.log("inside updaye post likes value heree");
    console.log(req.params);
    console.log(req.body);
    console.log(req.body.action);
    var currentLikesCount = await LikesModel.find({post_id : req.body.post_id});
    console.log("//////////////////////////////////////////////////////////////////");
    console.log(currentLikesCount._id);
    console.log(currentLikesCount[0].likes_count);
    console.log("444444444444666666666666668888888888888899999999999990000000000222222333335555");
    var query = { post_id: req.body.post_id };
    if (req.body.action) {
        var values = { $set: {likes_count: currentLikesCount[0].likes_count || currentLikesCount[0].likes_count == 0 ? currentLikesCount[0].likes_count + 1 : 0 },
            $push: {liked_by: req.body.liked_by} };    
    } else {    
        var values = { $set: {likes_count: currentLikesCount[0].likes_count && currentLikesCount[0].likes_count > 0 ? currentLikesCount[0].likes_count - 1 : 0 },
            $push: {liked_by: req.body.liked_by} };
    }
    console.log("values coming here isss 123123123123123123123123123123123123123123123123");
    console.log(values);
    console.log("///////////");
    LikesModel.updateOne(query, values, function(err, response) {
      if (err) throw res.status(401).send(err);
        console.log("/////////// after update response value hereeeeeeee");
    });   
    await PostModel.updateOne(query, values, function(err, response) {
        if (err) throw res.status(401).send(err);
        console.log("inside post model value here iss");
        console.log(response);
        console.log("after response value isss");
    });
    res.status(201).send({ "status": "Successfuly updated likes" })    
}; 


// Update or edit information about user
exports.createCommentsLikes = async(req, res) => {
    try {
            const likes_data_object = new LikesModel({
                post_id: req.params.id,
                comment_id: req.params.comment_id,
                parent_comment_id:req.body.parent_comment_id,
                liked_by:req.body.liked_by,
                likes_count: req.body.liked_by.length,
            });
 
            // Save   
            await likes_data_object.save()
             
            res.status(201).send({ likes_data_object })
    } catch (error) {
            res.status(400).send(error)
    }
};

// Update or edit information about user
exports.updateCommentsLikes = async(req, res) => {
    var query = { post_id: req.params.id, comment_id: req.params.comment_id };
    var values = { $set: {liked_by:req.body.liked_by, likes_count: req.body.liked_by.length } };
    LikesModel.updateOne(query, values, function(err, response) {
        if (err) throw res.status(401).send(err);;
        console.log("1 document updated");
        res.status(201).send({ "status": "Successfuly updated likes" })
    });   
};


//Get Post Object
exports.getPostLikes = async(req, res) => {
    try {
        const likes_data_object = await LikesModel.findById(req.params.id);
        res.status(201).send({ likes_data_object })        
    } catch (error) {
        res.status(400).send(error)
    }
};    


//Get Post Object
exports.getCommentsLikes = async(req, res) => {
    try {
        const post_data_object = await LikesModel.findById(req.params.id);
        res.status(201).send({ post_data_object })        
    } catch (error) {
        res.status(400).send(error)
    }
};    


 