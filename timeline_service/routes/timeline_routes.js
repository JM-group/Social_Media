module.exports = (app) => {
    const post = require('../controllers/post_controller.js');

    // Create a new Record / Signup
    app.post('/post', post.create);

    // Update user details
    app.put('/post', post.update)

    // Get user details and followers information
    app.get('/post/:id', post.get);

    // Delete a Note with festiveId
    app.delete('/post/:id', post.delete);   
}
