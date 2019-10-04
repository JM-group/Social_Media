module.exports = (app) => {
    const user = require('../controllers/user_controller.js');
    const auth = require('../middleware/auth.js');

    // Create a new Record / Signup
    app.post('/login', user.login);

    app.post('/user', user.create);

    // Update user details
    app.put('/user/:id', user.update);

    // Get user details and followers information
    app.get('/user/:id', auth, user.get);
    
    //Logout / Logout user from all devices
    app.post('/logout', user.logout);
    
    app.post('/logout_all', user.logout_all)

    // Delete a Note with festiveId
    app.delete('/user/:id', user.delete);
   
}
