module.exports = (app) => {
    const post = require('../controllers/post_controller.js');
    const like = require('../controllers/likes_controller.js');
    const comments = require('../controllers/comments_controller.js');

    // Create a new Record / Signup
    app.post('/post', post.create);

    // Update user details
    app.put('/post', post.update)

    // Get user details and followers information
    app.get('/post/:id', post.get);

    // Delete a Note with festiveId
    app.delete('/post/:id', post.delete);   

    // Post comments for post
    app.post('/comments/:post_id/:parent_comment_id/', comments.create);

    // Update user details
    app.put('/comments/:post_id/:comment_id', comments.update)

    // Get user details and followers information
    app.get('/comments/:post_id/:parent_id', comments.get);

    // Delete a Note with festiveId
    app.delete('/comments/:post_id', comments.deletePostComment);       

    // Delete a Note with festiveId
    app.delete('/comments/:post_id/comment_id', comments.delete);       

    // Create a entry for post likes
    app.post('/like/post/:id', like.createUpdatePostLikes);

    // Create a entry for comments likes
    app.post('/like/comment/:id', like.createUpdateComentsLikes);

    // Get user details and followers information
    app.get('/like/post/:id', like.getPostLikes);

    // Delete a Note with festiveId
    app.get('/like/comment/:id', like.getCommentsLikes);   
}
