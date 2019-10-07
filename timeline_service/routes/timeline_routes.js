module.exports = (app) => {
    const post = require('../controllers/post_controller.js');

    // Create a new Record / Signup
    app.post('/post', post.create);

    // Update user details

    // Get user details and followers information

    // Delete a Note with festiveId
   
}
